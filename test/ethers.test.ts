import { expect } from 'chai';
import {
  ownerBalance,
  owner,
  spender,
  recipient,
  getBalance,
  getAllowance,
  permit,
  tranferFrom,
} from '../utils/ethers';
import { ethers } from 'hardhat';

describe('ethers 구현 테스트', function () {
  it('getBalance는 인자로 받는 address의 잔액을 리턴해야 합니다.(balanceOf)', async function () {
    const balance = await getBalance(owner.address);

    expect(typeof balance).to.equal('bigint');
  });

  it('getAllowance는 Owner가 Spender에게 허용한 금액을 리턴해야 합니다.(allowance)', async function () {
    const allowance = await getAllowance(owner.address, spender.address);

    expect(typeof allowance).to.equal('bigint');
  });

  it('permit을 실행시키면 Owner의 전체 토큰 잔액과 Spender가 쓸 수 있는 양이 같아야 합니다.(이 과정에서 owner의 coin은 가스비로 소모되지 않아야 합니다)', async function () {
    const ownerTokenBalance = await getBalance(owner.address);
    const prevOwnerbalance = await ownerBalance();

    await permit();

    const allowance = await getAllowance(owner.address, spender.address);
    const afterOwnerbalance = await ownerBalance();

    expect(ownerTokenBalance).to.equal(allowance);
    expect(prevOwnerbalance).to.equal(afterOwnerbalance);
  });

  it('tranferFrom을 실행시키면 from의 토큰이 to에게 value 만큼 전송되어야 합니다.(이 과정에서 owner의 coin은 가스비로 소모되지 않아야 합니다. Spender가 transferFrom을 실행하도록 해주세요.)', async function () {
    const prevRecipientTokenBalance = await getBalance(recipient.address);
    const prevOwnerbalance = await ownerBalance();

    const value = ethers.parseEther('1');

    await tranferFrom(owner.address, recipient.address, value);

    const afterRecipientTokenBalance = await getBalance(recipient.address);
    const afterOwnerbalance = await ownerBalance();

    expect(afterRecipientTokenBalance).to.be.greaterThan(
      prevRecipientTokenBalance
    );
    expect(prevOwnerbalance).to.equal(afterOwnerbalance);
  });
});
