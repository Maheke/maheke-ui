import BigNumber from "bignumber.js";
import { BASE_FEE } from "stellar-sdk";

export function calculateRemainingDays(deadline: string): number {
  const actualDate = Date.now();
  const milisecondsInADay = 60 * 60 * 24 * 1000;
  const deadlineTime = new Date(deadline).getTime();
  const remainingTime = deadlineTime - actualDate;
  const remainingDays = Math.floor(remainingTime / milisecondsInADay + 1);
  return remainingDays;
}

function hasSufficientBalance(amount: BigNumber, xlmBalance: BigNumber) {
  const maxAvailable = xlmBalance.minus(new BigNumber(BASE_FEE));
  const isAmountAvailable = amount.lte(maxAvailable);
  return isAmountAvailable;
}

export function checkInvalidInputMessage(
  amount: string,
  xlmBalance: string
): string {
  let invalidInputMessage = "";

  if (!amount) {
    invalidInputMessage = "You must type a number";
  } else if (
    !hasSufficientBalance(new BigNumber(amount), new BigNumber(xlmBalance))
  ) {
    invalidInputMessage =
      "You don't have enough XLM. The cost of this operation including fees would bring your account below the reserve.";
  }

  return invalidInputMessage;
}
