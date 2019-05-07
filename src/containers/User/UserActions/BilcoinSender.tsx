import React, {FormEvent} from "react";

import {
  AnchorButton,
  Button,
  Classes,
  Code,
  Dialog,
  FormGroup,
  H5,
  InputGroup,
  Intent,
  Switch,
  Tooltip,
  NumericInput
} from "@blueprintjs/core";

interface BilcoinSenderProps {
  isOpen: boolean
  open: Function
  close: Function
  name: string
  id: number
  sendBilcoins: Function
}

interface BilcoinSenderState {
  autoFocus: boolean;
  canEscapeKeyClose: boolean;
  canOutsideClickClose: boolean;
  enforceFocus: boolean;
  usePortal: boolean;
  amount: number
}

export class BilcoinSender extends React.PureComponent<BilcoinSenderProps, BilcoinSenderState> {
  public state: BilcoinSenderState = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    usePortal: true,
    amount: 0
  };

  public render() {
    const { amount } = this.state;
    return (
      <Dialog
        icon="info-sign"
        onClose={this.handleClose}
        title={`Send Bilcoins to ${this.props.name}`}
        isOpen={this.props.isOpen}
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={this.sendBilcoins} className="send-bilcoins-body">
            <NumericInput
              placeholder="Enter BLC"
              onValueChange={this.updateAmount}
              value={amount}
              min={100}
              max={1000}
              large
            />
            <Button large type="submit">Send</Button>
          </form>
        </div>
      </Dialog>
    );
  }

  private sendBilcoins = async (e: FormEvent) => {
    const { amount } = this.state;
    e.preventDefault();
    await this.props.sendBilcoins(amount);
    this.handleClose();
    this.setState({ amount: 100 });
  };

  private updateAmount = (amount: number) => {
    this.setState({ amount });
  };

  private handleOpen = () => this.props.open();
  private handleClose = () => this.props.close();
}

export default BilcoinSender;
