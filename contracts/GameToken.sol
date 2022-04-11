// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <9.0.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/Context.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Math/SafeMath.sol";

contract GameToken is Context, IERC20, Ownable {
  using SafeMath for uint;

  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowances;

  uint256 private _totalSupply;
  uint8 private _decimals;
  string private _symbol;
  string private _name;
  address private _owner;

  constructor() {
    _name = "DoremiGame Token";
    _symbol = "DMG";
    _decimals = 18;
    _totalSupply = 10000 * 10**18;
    _owner = msg.sender;
    _balances[_owner] = _totalSupply;
    // _balances[_owner] = _totalSupply;

    emit Transfer(address(0), _owner, _totalSupply);
  }

  /* Getter function*/

  function getOwner() external view virtual returns (address) {
    return owner();
  }

  function decimals() external view virtual returns (uint8) {
    return _decimals;
  }

  function symbol() external view virtual returns (string memory) {
    return _symbol;
  }

  function name() external view virtual returns (string memory) {
    return _name;
  }

  function totalSupply() external view virtual override returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) public view virtual override returns (uint256) {
    return _balances[account];
  }

  function transfer(address recipient, uint256 amount) external virtual override returns (bool) {
    _transfer(_msgSender(), recipient, amount);
    return true;
  }

  function allowance(address owner, address spender) public view virtual override returns (uint256) {
    return _allowances[owner][spender];
  }

  function approve(address spender, uint256 amount) external virtual override returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
  }

  function test_getBlance(address account) public view returns (uint) {
    return balanceOf(account);
  }

  function getMsgSender() external view returns (address) {
    return _msgSender();
  }

  /* General function  */

  function _approve(
    address owner,
    address spender,
    uint256 amount
  ) public virtual {
    require(owner != address(0), "BEP20: approve from the zero address");
    require(spender != address(0), "BEP20: approve to the zero address");

    _allowances[owner][spender] = amount;

    emit Approval(owner, spender, amount);
  }

  function test_approve(address spender, uint256 amount) public virtual {
    _approve(_msgSender(), spender, amount);
  }

  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) public virtual override returns (bool) {
    _transfer(sender, recipient, amount);
    _approve(sender, recipient, _allowances[sender][recipient].sub(amount, "BEP20: transfer amount exceeds allowance"));
    return true;
  }

  function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, _allowances[owner][spender] + addedValue);
        return true;
    }

function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
    address owner = _msgSender();
    uint256 currentAllowance = allowance(owner, spender);
    require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
    unchecked {
        _approve(owner, spender, currentAllowance - subtractedValue);
    }

    return true;
}

  function mint(uint256 amount) public virtual onlyOwner returns (bool) {
    _mint(_msgSender(), amount);
    return true;
  }

  /* Helper function */

  function _transfer(
    address sender,
    address recipient,
    uint256 amount
  ) internal virtual {
    require(sender != address(0), "BEP20: transfer from the zero address");
    require(recipient != address(0), "BEP20: transfer to the zero address");

    _balances[sender] = _balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
    _balances[recipient] = _balances[recipient].add(amount);

    emit Transfer(sender, recipient, amount);
  }

  function _mint(address account, uint256 amount) internal {
    require(account != address(0), "BEP20: mint to the zero address");

    _totalSupply = _totalSupply.add(amount);
    _balances[account] = _balances[account].add(amount);

    emit Transfer(address(0), account, amount);
  }

  function _burn(address account, uint256 amount) internal virtual {
    require(account != address(0), "BEP20: burn from the zero address");

    _balances[account] = _balances[account].sub(amount, "BEP20: burn amount exceeds balance");
    _totalSupply = _totalSupply.sub(amount);

    emit Transfer(account, address(0), amount);
  }

  function _burnFrom(address account, uint256 amount) internal virtual {
    _burn(account, amount);
    _approve(
      account,
      _msgSender(),
      _allowances[account][_msgSender()].sub(amount, "BEP20: burn amount exceeds allowance")
    );
  }
}
