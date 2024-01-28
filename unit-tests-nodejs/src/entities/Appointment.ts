interface Props {
  customerName: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private props: Props;

  get customerName() {
    return this.props.customerName;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  constructor(props: Props) {
    if (props.startsAt <= new Date()) {
      throw new Error('StartsAt prop should be later than actual moment');
    }

    if (props.startsAt >= props.endsAt) {
      throw new Error('StartsAt prop should be earlier than EndsAt');
    }

    this.props = props;
  }
}
