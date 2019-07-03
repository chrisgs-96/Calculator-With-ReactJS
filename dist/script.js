class Square extends React.Component {//Each square represents a button on the calculator.Mostly it's looks because main functionality is in the Container class
  render() {
    return (
      React.createElement("button", { className: this.props.className, onClick: () => this.props.onClick() },
      this.props.value));


  }}


class Screen extends React.Component {
  //Screen is the area in which the calculation results will be appearing.
  render() {
    return React.createElement("div", { className: this.props.className }, this.props.value);
  }}


class Container extends React.Component {
  /*This class will contain all the basic things this program can do, it creates the calculator, it also adds an extra small screen
                                         which shows our operation history.The main idea is that we work with 2 numbers : sum and temp_num. 
                                         Sum-> It's used when we haven't selected an operator,so it's basically the number which is left of the operator
                                         Temp_num-> We use it when we've selected + or - and it acts like the number right of the operator
                                         */
  constructor(props) {
    super(props);
    this.state = {
      operations: [' ', '+', '-', '='],
      sum: 0,
      temp_num: 0,
      hasSelectedOperator: false,
      operator: '',
      scr: '',
      selectedOperator: 0 };

  }

  /*When we press a number, this function activates and it creates the new number,it also updates the screen with that number.
    This class was essential cause otherwise we'd only be able to do operations with numbers that range from 0 to 9.*/
  numberPress(i)
  {
    if (!this.state.hasSelectedOperator)
    {
      this.setState(
      {
        scr: this.state.sum.toString().concat(i.toString()),
        sum: parseInt(this.state.sum.toString().concat(i.toString())) });

    } else

    {
      this.setState(
      {
        scr: this.state.temp_num.toString().concat(i.toString()),
        temp_num: parseInt(this.state.temp_num.toString().concat(i.toString())) });

    }

  }

  /*This is activated when we press a symbol, it makes the correct operations depending on what symbol we've pressed (+,-,C,=) and
    depending on whether we've clicked on another operator before. For example if i press 9 + 4 - 4 it will work and make a result appear.*/
  symbolPress(i)
  {
    if (i == 0) //Press C 
      {
        this.setState({
          sum: 0,
          temp_num: 0,
          scr: '',
          selectedOperator: 0,
          hasSelectedOperator: false,
          temp_num: 0 });

      } else
    if (i == 1) //Press + 
      {
        if (this.state.hasSelectedOperator)
        {
          //let temp = this.state.sum + this.state.temp_num
          let temp = this.state.selectedOperator == 1 ? this.state.sum + this.state.temp_num : this.state.sum - this.state.temp_num;
          this.setState({
            scr: temp,
            selectedOperator: 1,
            sum: temp,
            temp_num: 0,
            hasSelectedOperator: true });

        } else

        {
          this.setState({
            sum: this.state.sum + this.state.temp_num,
            selectedOperator: 1,
            scr: '',
            hasSelectedOperator: true });

        }

      } else
    if (i == 2) //Press -
      {
        if (this.state.hasSelectedOperator)
        {
          let temp = this.state.selectedOperator == 1 ? this.state.sum + this.state.temp_num : this.state.sum - this.state.temp_num;
          this.setState({
            scr: temp,
            selectedOperator: 2,
            sum: temp,
            temp_num: 0,
            hasSelectedOperator: true });

        } else

        {
          this.setState({
            sum: this.state.sum - this.state.temp_num,
            selectedOperator: 2,
            scr: '',
            hasSelectedOperator: true });
        }
      } else
    if (i == 3) //Press =
      {
        if (this.state.selectedOperator == 1)
        {
          let temp = this.state.sum + this.state.temp_num;
          this.setState({
            scr: temp,
            selectedOperator: 0,
            sum: this.state.sum + this.state.temp_num,
            temp_num: 0,
            hasSelectedOperator: false });
        } else
        if (this.state.selectedOperator == 2)
        {
          let temp = this.state.sum - this.state.temp_num;
          this.setState({
            scr: temp,
            selectedOperator: 0,
            sum: temp,
            temp_num: 0,
            hasSelectedOperator: false });

        }
      }
  }

  /*Renders the screen of the calculator*/
  render() {
    let _temp_num = this.state.temp_num == 0 ? '' : this.state.temp_num;
    let _sum = this.state.sum;
    return React.createElement("div", { className: "calculatorBorder" },
    React.createElement("div", { className: "smallScreen" }, " ", _sum, " ", this.state.operations[this.state.selectedOperator], " ", _temp_num, " ", " "),
    React.createElement("div", null, React.createElement(Screen, { value: this.state.scr, className: "screen" }), " "),
    React.createElement("div", null, React.createElement(Square, { className: "orange", value: "C", onClick: () => this.symbolPress(0) }), React.createElement(Square, { className: "orange", value: "+", onClick: () => this.symbolPress(1) }), React.createElement(Square, { className: "orange", value: "-", onClick: () => this.symbolPress(2) })),
    React.createElement("div", null, React.createElement(Square, { className: "gray", value: "7", onClick: () => this.numberPress(7) }), React.createElement(Square, { className: "gray", value: "8", onClick: () => this.numberPress(8) }), React.createElement(Square, { className: "gray", value: "9", onClick: () => this.numberPress(9) })),
    React.createElement("div", null, React.createElement(Square, { className: "gray", value: "4", onClick: () => this.numberPress(4) }), React.createElement(Square, { className: "gray", value: "5", onClick: () => this.numberPress(5) }), React.createElement(Square, { className: "gray", value: "6", onClick: () => this.numberPress(6) })),
    React.createElement("div", null, React.createElement(Square, { className: "gray", value: "1", onClick: () => this.numberPress(1) }), React.createElement(Square, { className: "gray", value: "2", onClick: () => this.numberPress(2) }), React.createElement(Square, { className: "gray", value: "3", onClick: () => this.numberPress(3) })),
    React.createElement("div", null, React.createElement(Square, { className: "zero", value: "0", onClick: () => this.numberPress(0) }), React.createElement(Square, { className: "sum", value: "=", onClick: () => this.symbolPress(3) })));

  }}


ReactDOM.render(
React.createElement(Container, null),
document.getElementById('root'));