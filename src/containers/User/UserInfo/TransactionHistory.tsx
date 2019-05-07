import React from "react";

import {
  Button,
  Classes,
  Code,
  Divider,
  Drawer,
  H5,
  HTMLSelect,
  IOptionProps,
  Label,
  Position,
  Switch,
} from "@blueprintjs/core";

import Transaction from "../../../modals/Transaction";
import { getTransactionHistory } from "../../../services/transaction";

interface TransactionHistoryProps {
  isOpen: boolean
  userEmail: string
  open: Function
  close: Function
}

export interface TransactionHistoryState {
  autoFocus: boolean;
  canEscapeKeyClose: boolean;
  canOutsideClickClose: boolean;
  enforceFocus: boolean;
  hasBackdrop: boolean;
  position?: Position;
  size: string;
  usePortal: boolean;
  transactions: Transaction[]
}

export default class TransactionHistory extends React.Component<TransactionHistoryProps, TransactionHistoryState> {
  public state: TransactionHistoryState = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    position: Position.RIGHT,
    size: "30%",
    usePortal: true,
    transactions: []
  };

  componentDidUpdate(prevProps: TransactionHistoryProps) {
    if (prevProps.userEmail !== this.props.userEmail) {
      this.getTransactions();
    }
  }

  componentDidMount(): void {
    this.getTransactions();
  }

  render() {
    const { transactions } = this.state;
    return (
      <Drawer
        icon="info-sign"
        isOpen={this.props.isOpen}
        onClose={this.handleClose}
        title={`Transactions of ${this.props.userEmail}`}
        {...this.state}
      >
        <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-striped bp3-interactive bp3-small">
          <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
            {
              transactions.map(transaction => (
                <tr key={JSON.stringify(transaction)}>
                  <td>{transaction.senderEmail}</td>
                  <td>{transaction.receiverEmail}</td>
                  <td>{transaction.amount} BLC</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Drawer>
    );
  }

  getTransactions = async () => {
    const transactions = await getTransactionHistory(this.props.userEmail);
    this.setState({ transactions });
  };

  private handleOpen = () => this.props.open();
  private handleClose = () => this.props.close();
}
