document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc_form');

  const output = document.querySelector('#output');
  const operandBtns = document.querySelectorAll('button[data-type=operand]');
  const operatorBtns = document.querySelectorAll('button[data-type=operator]');

  let isOperator = false;
  let equation = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const remove_active = () => {
    operatorBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
  };

  operandBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (output.value.length < 9) {
        if (output.value == '0') {
          output.value = e.target.value;
        } else if (output.value.includes('.') && !isOperator) {
          output.value = output.value + '' + e.target.value.replace('.', '');
        } else if (isOperator) {
          isOperator = false;
          output.value = e.target.value;
        } else {
          output.value = output.value + '' + e.target.value;
        }
      }
    });
  });

  operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      remove_active();
      e.currentTarget.classList.add('active');

      switch (e.target.value) {
        case '%':
          output.value = parseFloat(output.value) / 100;
					remove_active();
          break;
        case 'invert':
          output.value = parseFloat(output.value) * -1;
					remove_active();
          break;
        case '=':
          equation.push(output.value);
          output.value = eval(equation.join(''));
          equation = [];
					remove_active();
					isOperator = true;
          break;
        default:
          let last_item = equation[equation.length - 1];
          if (['/', '*', '+', '-'].includes(last_item) && isOperator) {
            equation.pop();
            equation.push(e.target.value);
          } else {
            equation.push(output.value);
            equation.push(e.target.value);
          }
          isOperator = true;
          break;
      }
    });
  });
});
