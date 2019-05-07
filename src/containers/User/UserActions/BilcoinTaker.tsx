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

interface BilcoinTakerProps {
  isOpen: boolean
  open: Function
  close: Function
  name: string
  id: number
  takeBilcoins: Function
}

interface BilcoinTakerState {
  autoFocus: boolean;
  canEscapeKeyClose: boolean;
  canOutsideClickClose: boolean;
  enforceFocus: boolean;
  usePortal: boolean;
  amount: number
}

export class BilcoinTaker extends React.PureComponent<BilcoinTakerProps, BilcoinTakerState> {
  public state: BilcoinTakerState = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    usePortal: true,
    amount: 0
  };

  public render() {
    const {amount} = this.state;
    return (
      <Dialog
        icon="info-sign"
        onClose={this.handleClose}
        title={`Take Bilcoins from ${this.props.name}`}
        isOpen={this.props.isOpen}
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={this.takeBilcoins} className="send-bilcoins-body">
            <NumericInput
              placeholder="Enter BLC"
              onValueChange={this.updateAmount}
              value={amount}
              min={100}
              max={1000}
              large
            />
            <Button large type="submit">Take</Button>
          </form>
        </div>
      </Dialog>
    );
  }

  private takeBilcoins = async (e: FormEvent) => {
    const {amount} = this.state;
    e.preventDefault();
    await this.props.takeBilcoins(amount);
    this.handleClose();
    this.setState({ amount: 100 });
  };

  private updateAmount = (amount: number) => {
    this.setState({amount});
  };

  private handleOpen = () => this.props.open();
  private handleClose = () => this.props.close();
}

export default BilcoinTaker;
