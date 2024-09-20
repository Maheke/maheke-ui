import type IStatus from "../../lib/components/proposals/IStatus";

export function getProposalStatus(id: string, proposal: any): any {
  let status: IStatus["status"];
  let remainingTime = 0;
  let remainingTimeMeasure = "";
  const votingResult = proposal.votingResult;
  const today = new Date();
  const proposalDate = new Date(proposal.deadline);
  const minutesUntilDeadline = Math.floor(
    (proposalDate.getTime() - today.getTime()) / 1000 / 60
  );
  const hoursUntilDeadline = Math.floor(
    (proposalDate.getTime() - today.getTime()) / 1000 / 60 / 60
  );
  const daysUntilDeadline = Math.floor(hoursUntilDeadline / 24);

  if (votingResult) {
    status = votingResult;
  } else {
    if (daysUntilDeadline > 0) {
      status = "ACTIVE";
      remainingTime = daysUntilDeadline;
      remainingTimeMeasure = daysUntilDeadline > 1 ? "DAYS" : "DAY";
    } else if (hoursUntilDeadline > 0) {
      status = "CLOSING";
      remainingTime = hoursUntilDeadline;
      remainingTimeMeasure = hoursUntilDeadline > 1 ? "HOURS" : "HOUR";
    } else if (minutesUntilDeadline > 0) {
      status = "CLOSING";
      remainingTime = minutesUntilDeadline;
      remainingTimeMeasure = minutesUntilDeadline > 1 ? "MINUTES" : "MINUTE";
    } else {
      status = "CLOSED";
    }
  }

  return { id, data: proposal, status, remainingTime, remainingTimeMeasure };
}
