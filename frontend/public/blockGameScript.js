"use strict";

// 게임 스테이지
var Stage = /** @class */ (function () {
  function Stage() {
    // blockGameContainer
    var _this = this;
    this.render = function () {
      this.renderer.render(this.scene, this.camera);
    };
    this.add = function (elem) {
      this.scene.add(elem);
    };
    this.remove = function (elem) {
      this.scene.remove(elem);
    };
    this.blockGameContainer = document.getElementById("game");
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("#D0CBC7", 1);
    this.blockGameContainer.appendChild(this.renderer.domElement);
    // scene
    this.scene = new THREE.Scene();
    // camera
    var aspect = window.innerWidth / window.innerHeight;
    var d = 20;
    this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, -100, 1000);
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    //light
    this.light = new THREE.DirectionalLight(0xffffff, 0.5);
    this.light.position.set(0, 499, 0);
    this.scene.add(this.light);
    this.softLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(this.softLight);
    window.addEventListener("resize", function () {
      return _this.onResize();
    });
    this.onResize();
  }
  Stage.prototype.setCamera = function (y, speed) {
    if (speed === void 0) {
      speed = 0.3;
    }
    TweenLite.to(this.camera.position, speed, {
      y: y + 4,
      ease: Power1.easeInOut,
    });
    TweenLite.to(this.camera.lookAt, speed, { y: y, ease: Power1.easeInOut });
  };
  Stage.prototype.onResize = function () {
    var viewSize = 30;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.left = window.innerWidth / -viewSize;
    this.camera.right = window.innerWidth / viewSize;
    this.camera.top = window.innerHeight / viewSize;
    this.camera.bottom = window.innerHeight / -viewSize;
    this.camera.updateProjectionMatrix();
  };
  return Stage;
})();

// 블록 클래스
var Block = /** @class */ (function () {
  function Block(block) {
    // set size and position
    // 블록의 상태 {움직이는중, 정지, 미스(쌓기 실패)}
    this.STATES = { ACTIVE: "active", STOPPED: "stopped", MISSED: "missed" };
    this.MOVE_AMOUNT = 12; // 블록이 왕복할 이동 범위
    this.dimension = { width: 0, height: 0, depth: 0 };
    this.position = { x: 0, y: 0, z: 0 };
    this.targetBlock = block; // 유저가 이번에 쌓을 블록
    // 새로 쌓을 블록이 있으면
    this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1;
    this.workingPlane = this.index % 2 ? "x" : "z";
    this.workingDimension = this.index % 2 ? "width" : "depth";
    // set the dimensions from the target block, or defaults.
    // 블록들 크기 지정
    this.dimension.width = this.targetBlock ? this.targetBlock.dimension.width : 10; // 블록 너비(가로)
    this.dimension.height = this.targetBlock ? this.targetBlock.dimension.height : 2; // 블록 높이(두께)
    this.dimension.depth = this.targetBlock ? this.targetBlock.dimension.depth : 10; // 블록 깊이(세로)
    // 블록이 화면의 어느 지점에 위치할건지 정하는 녀석들(가로, 높이, 세로)
    this.position.x = this.targetBlock ? this.targetBlock.position.x : -7;
    this.position.y = this.dimension.height * this.index;
    this.position.z = this.targetBlock ? this.targetBlock.position.z : 0;
    // 블록 색상 랜덤 지정을 위한 변수
    this.colorOffset = this.targetBlock ? this.targetBlock.colorOffset : Math.round(Math.random() * 100);
    // set color
    if (!this.targetBlock) {
      // 초기 블록 색상
      this.color = 0x333344;
    } else {
      // 새로 등장할 블록 색상 지정
      var offset = this.index + this.colorOffset;
      var r = Math.sin(0.3 * offset) * 55 + 200;
      var g = Math.sin(0.3 * offset + 2) * 55 + 200;
      var b = Math.sin(0.3 * offset + 4) * 55 + 200;
      this.color = new THREE.Color(r / 255, g / 255, b / 255);
    }
    // 블록 상태 (첫블록 인덱스0, 게임시작시 추가될 블록 인덱스1)
    // (즉 블록을 쌓으려고 왔다갔다하는 상태이면 이동중, 쌓기 성공하면 정지)
    this.state = this.index > 1 ? this.STATES.ACTIVE : this.STATES.STOPPED;
    // set direction
    // 블록 이동속도는 블록이 추가될때마다 증가할것
    // (음수가 커질수록 속도가 증가함)
    this.speed = -0.1 - this.index * 0.005;
    // 속도가 -1 미만일 때 -1로 고정
    // (속도가 -1를 최대로 고정하기)
    if (this.speed < -1) this.speed = -1;

    this.direction = this.speed;
    // create block
    var geometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
    geometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(this.dimension.width / 2, this.dimension.height / 2, this.dimension.depth / 2)
    );
    this.material = new THREE.MeshToonMaterial({
      color: this.color,
      shading: THREE.FlatShading,
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.set(
      this.position.x,
      this.position.y + (this.state == this.STATES.ACTIVE ? 0 : 0),
      this.position.z
    );
    if (this.state == this.STATES.ACTIVE) {
      this.position[this.workingPlane] = Math.random() > 0.5 ? -this.MOVE_AMOUNT : this.MOVE_AMOUNT;
    }
  }
  Block.prototype.reverseDirection = function () {
    this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed);
  };
  Block.prototype.place = function () {
    this.state = this.STATES.STOPPED;
    var overlap =
      this.targetBlock.dimension[this.workingDimension] -
      Math.abs(this.position[this.workingPlane] - this.targetBlock.position[this.workingPlane]);
    var blocksToReturn = {
      plane: this.workingPlane,
      direction: this.direction,
    };
    // 특정 범위까지는 어긋나게 놓아도 완벽히 놓은걸로 만들어주는 녀석
    if (this.dimension[this.workingDimension] - overlap < 0.3) {
      overlap = this.dimension[this.workingDimension];
      blocksToReturn.bonus = true;
      this.position.x = this.targetBlock.position.x;
      this.position.z = this.targetBlock.position.z;
      this.dimension.width = this.targetBlock.dimension.width;
      this.dimension.depth = this.targetBlock.dimension.depth;
    }
    // 겹치는게 있게 놓았으면
    if (overlap > 0) {
      var choppedDimensions = {
        width: this.dimension.width,
        height: this.dimension.height,
        depth: this.dimension.depth,
      };
      choppedDimensions[this.workingDimension] -= overlap;
      this.dimension[this.workingDimension] = overlap;
      var placedGeometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
      placedGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(
          this.dimension.width / 2,
          this.dimension.height / 2,
          this.dimension.depth / 2
        )
      );
      var placedMesh = new THREE.Mesh(placedGeometry, this.material);
      var choppedGeometry = new THREE.BoxGeometry(
        choppedDimensions.width,
        choppedDimensions.height,
        choppedDimensions.depth
      );
      choppedGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(
          choppedDimensions.width / 2,
          choppedDimensions.height / 2,
          choppedDimensions.depth / 2
        )
      );
      var choppedMesh = new THREE.Mesh(choppedGeometry, this.material);
      var choppedPosition = {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      };
      if (this.position[this.workingPlane] < this.targetBlock.position[this.workingPlane]) {
        this.position[this.workingPlane] = this.targetBlock.position[this.workingPlane];
      } else {
        choppedPosition[this.workingPlane] += overlap;
      }
      placedMesh.position.set(this.position.x, this.position.y, this.position.z);
      choppedMesh.position.set(choppedPosition.x, choppedPosition.y, choppedPosition.z);
      blocksToReturn.placed = placedMesh;
      if (!blocksToReturn.bonus) blocksToReturn.chopped = choppedMesh;
    } else {
      // 겹친게 하나도 없으면 블록쌓기 실패
      this.state = this.STATES.MISSED;
    }
    this.dimension[this.workingDimension] = overlap;
    return blocksToReturn;
  };
  Block.prototype.tick = function () {
    if (this.state == this.STATES.ACTIVE) {
      var value = this.position[this.workingPlane];
      if (value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT) this.reverseDirection();
      this.position[this.workingPlane] += this.direction;
      this.mesh.position[this.workingPlane] = this.position[this.workingPlane];
    }
  };
  return Block;
})();

var StackingBlocksGame = /** @class */ (function () {
  // 게임 초기화
  function StackingBlocksGame() {
    var _this = this;
    // 게임 상태
    this.STATES = {
      LOADING: "loading", // 로딩중
      PLAYING: "playing", // 플레이중
      READY: "ready", // 준비됨
      ENDED: "ended", // 끝남
      RESETTING: "resetting", // 재시작중
    };
    this.blocks = []; // 앞으로 쌓일 블록이 담길 배열
    this.state = this.STATES.LOADING; // 게임의 초기 상태는 로딩중
    this.stage = new Stage(); // 스테이지 세팅
    this.mainContainer = document.getElementById("blockGameContainer");
    this.scoreContainer = document.getElementById("score"); // 게임점수
    this.startButton = document.getElementById("start-button");
    this.placeBlockButton = document.querySelector(".placeBlock-button");
    this.restartGameButton = document.getElementById("restart-button");
    this.instructions = document.getElementById("instructions");
    this.scoreContainer.innerHTML = "0"; // 첫화면 점수는 0
    this.newBlocks = new THREE.Group();
    this.placedBlocks = new THREE.Group();
    this.choppedBlocks = new THREE.Group();
    this.stage.add(this.newBlocks);
    this.stage.add(this.placedBlocks);
    this.stage.add(this.choppedBlocks);
    console.log(this.scoreContainer.innerHTML);
    this.addBlock(); // 맨바닥에 첫블록 놓는것
    console.log(this.scoreContainer.innerHTML);
    this.tick();
    this.updateState(this.STATES.READY);

    this.startButton.addEventListener("click", function (e) {
      if (_this.state != "ready") return;
      if (!confirm(`횟수가 차감됩니다. 게임을 시작 하시겠습니까?`)) return;
      _this.startGame();
    });
    this.placeBlockButton.addEventListener("click", function (e) {
      _this.placeBlock();
    });
    this.restartGameButton.addEventListener("click", function (e) {
      if (!confirm(`횟수가 차감됩니다. 게임을 시작 하시겠습니까?`)) return;
      _this.restartGame();
    });
  }
  // 게임 상태 업데이트
  StackingBlocksGame.prototype.updateState = function (newState) {
    for (var key in this.STATES) this.mainContainer.classList.remove(this.STATES[key]);
    this.mainContainer.classList.add(newState);
    this.state = newState;
  };
  // 액션 발동시 게임 상태에 따라 반응
  StackingBlocksGame.prototype.onAction = function () {
    switch (this.state) {
      // 준비됐으면 게임시작
      case this.STATES.READY:
        this.startGame();
        break;
      // 게임중이면 블록 놓기
      case this.STATES.PLAYING:
        this.placeBlock();
        break;
      // 게임이 종료상태면 재시작
      case this.STATES.ENDED:
        this.restartGame();
        break;
    }
  };

  StackingBlocksGame.prototype.startGame = function () {
    if (this.state != this.STATES.PLAYING) {
      this.scoreContainer.innerHTML = "0";
      this.updateState(this.STATES.PLAYING);
      this.addBlock();
    }
  };
  StackingBlocksGame.prototype.restartGame = function () {
    var _this = this;
    this.updateState(this.STATES.RESETTING);
    var oldBlocks = this.placedBlocks.children;
    var removeSpeed = 0.2;
    var delayAmount = 0.02;
    var _loop_1 = function (i) {
      TweenLite.to(oldBlocks[i].scale, removeSpeed, {
        x: 0,
        y: 0,
        z: 0,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn,
        onComplete: function () {
          return _this.placedBlocks.remove(oldBlocks[i]);
        },
      });
      TweenLite.to(oldBlocks[i].rotation, removeSpeed, {
        y: 0.5,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn,
      });
    };
    for (var i = 0; i < oldBlocks.length; i++) {
      _loop_1(i);
    }
    var cameraMoveSpeed = removeSpeed * 2 + oldBlocks.length * delayAmount;
    this.stage.setCamera(2, cameraMoveSpeed);
    var countdown = { value: this.blocks.length - 1 };
    TweenLite.to(countdown, cameraMoveSpeed, {
      value: 0,
      onUpdate: function () {
        _this.scoreContainer.innerHTML = String(Math.round(countdown.value));
      },
    });
    this.blocks = this.blocks.slice(0, 1);
    setTimeout(function () {
      _this.startGame();
    }, cameraMoveSpeed * 1000);
  };
  // 블록 놓기
  StackingBlocksGame.prototype.placeBlock = function () {
    var _this = this;
    var currentBlock = this.blocks[this.blocks.length - 1];
    var newBlocks = currentBlock.place();
    this.newBlocks.remove(currentBlock.mesh);
    if (newBlocks.placed) this.placedBlocks.add(newBlocks.placed);
    if (newBlocks.chopped) {
      this.choppedBlocks.add(newBlocks.chopped);
      var positionParams = {
        y: "-=30",
        ease: Power1.easeIn,
        onComplete: function () {
          return _this.choppedBlocks.remove(newBlocks.chopped);
        },
      };
      var rotateRandomness = 10;
      var rotationParams = {
        delay: 0.05,
        x: newBlocks.plane == "z" ? Math.random() * rotateRandomness - rotateRandomness / 2 : 0.1,
        z: newBlocks.plane == "x" ? Math.random() * rotateRandomness - rotateRandomness / 2 : 0.1,
        y: Math.random() * 0.1,
      };
      if (newBlocks.chopped.position[newBlocks.plane] > newBlocks.placed.position[newBlocks.plane]) {
        positionParams[newBlocks.plane] = "+=" + 40 * Math.abs(newBlocks.direction);
      } else {
        positionParams[newBlocks.plane] = "-=" + 40 * Math.abs(newBlocks.direction);
      }
      TweenLite.to(newBlocks.chopped.position, 1, positionParams);
      TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams);
    }
    this.addBlock();
  };
  // 블록 추가
  StackingBlocksGame.prototype.addBlock = function () {
    // 마지막 블록은 blocks배열 길이-1번째 인덱스 요소
    var lastBlock = this.blocks[this.blocks.length - 1];
    // 블록을 놓았을 때 마지막 블록 위에 놓지 못하고 허공에 놓으면 게임오버
    if (lastBlock && lastBlock.state == lastBlock.STATES.MISSED) {
      return this.endGame();
    }
    // 블록쌓기 성공했으면
    // 점수는 쌓여있는 블록 개수-1(1개는 맨 밑바닥에 있으므로)
    this.scoreContainer.innerHTML = String(this.blocks.length - 1);
    var newKidOnTheBlock = new Block(lastBlock);
    this.newBlocks.add(newKidOnTheBlock.mesh);
    this.blocks.push(newKidOnTheBlock);
    this.stage.setCamera(this.blocks.length * 2);
    if (this.blocks.length >= 5) this.instructions.classList.add("hide");
  };

  // 게임오버 됐을 때 게임상태 '끝남'으로 변경
  StackingBlocksGame.prototype.endGame = function () {
    this.updateState(this.STATES.ENDED);
  };

  // 블록
  StackingBlocksGame.prototype.tick = function () {
    var _this = this;
    // 블록 놓는 녀석
    this.blocks[this.blocks.length - 1].tick();
    this.stage.render(); // 블록 렌더링
    // 블록 애니메이션
    requestAnimationFrame(function () {
      _this.tick();
    });
  };

  return StackingBlocksGame;
})();
var stackingBlocksGame = new StackingBlocksGame();
