import { useState } from "react";
const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

    const handleNumberClick = (number) => {
        setDisplay(display === "0" ? number : display + number);
        setExpression(expression + number);
    }
    const handleOperator = (operator) => {
        setExpression(expression + operator);
        setDisplay(expression +operator);
    };
    const handleEqual = () => {
        try {
            const result = eval(expression);
            setDisplay(result);
            setExpression(String(result));
        } catch {
            setDisplay("Error");
        }
    };
    const handleClear = () => {
        setDisplay("0");
        setExpression("");
    };
    const handleDecimal = () => {
            setDisplay(display + ".");
            setExpression(expression + ".");
        
    };
  return (
    <section className="grid min-h-screen w-full place-items-center bg-[radial-gradient(circle_at_15%_10%,rgba(224,136,68,0.2),transparent_32%),linear-gradient(135deg,#24211e_0%,#111111_55%,#342116_100%)] p-3 sm:p-6" aria-label="Calculator">
      <div className="w-full max-w-[390px] rounded-3xl border border-white/10 bg-[#1b1b1b] p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:p-[22px]">
        <div className="min-h-[126px] overflow-hidden rounded-2xl bg-[#292825] p-5 text-right">

          <h2 className="mt-[18px] overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(2.25rem,10vw,3.5rem)] font-semibold leading-none text-[#fffaf0]">{display}</h2>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,3fr)_minmax(58px,1fr)] gap-3 text-lg [&_button]:min-h-[50px] [&_button]:rounded-[14px] [&_button]:border-0 [&_button]:font-bold [&_button]:transition [&_button]:duration-150 [&_button:hover]:brightness-110 [&_button:hover]:-translate-y-0.5 [&_button:active]:translate-y-px [&_button:active]:scale-95 sm:[&_button]:min-h-[54px] [&_.utility-button]:bg-[#e1a36b] [&_.utility-button]:text-[#302015] [&_.number-button]:bg-[#3b3a38] [&_.number-button]:text-[#f7f3ea] [&_.operator-button]:bg-[#bf6335] [&_.operator-button]:text-[#fff8ed]">
        <div>
          <div className="grid grid-cols-3 gap-2.5">
            <button onClick={handleClear} className="calculator-button utility-button">
              AC
            </button>
            <button onClick={handleEqual} className="calculator-button utility-button">
              =
            </button>
            <button onClick={() => handleOperator("%")} className="calculator-button utility-button">
              %
            </button>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-2.5">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number.toString())}
                className="calculator-button number-button"
              >
                {number}
              </button>
            ))}
           
             <button onClick={() => handleNumberClick("00")} className="calculator-button number-button">
              00
            </button>
            <button onClick={() => handleNumberClick("0")} className="calculator-button number-button">
              0
            </button>
            <button onClick={handleDecimal} className="calculator-button number-button">
              .
            </button>
          </div>
        </div>

        <div className="grid gap-2.5">
          <button onClick={() => handleOperator("/")} className="calculator-button operator-button">
            /
          </button>
          <button onClick={() => handleOperator("*")} className="calculator-button operator-button">
            X
          </button>
          <button onClick={() => handleOperator("-")} className="calculator-button operator-button">
            -
          </button>
          <button onClick={() => handleOperator("+")} className="calculator-button operator-button">
            +
          </button>
          <button onClick={() => handleOperator("**")} className="calculator-button operator-button">
            **
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Calculator;
