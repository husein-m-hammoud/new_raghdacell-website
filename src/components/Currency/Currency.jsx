// import React from "react";
// import { useContextTranslate } from "../../Context/ContextAPI";

// const Currency = ({ number, currency }) => {
//   const { profile } = useContextTranslate();
//   return (
//     <span>
//       {profile?.currency === "USD"
//         ? number?.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })

//         : parseInt(number).toLocaleString() || 0}
//       {" " + (currency || profile?.currency || "")}
//     </span>
//   );
// };

// export default Currency;
import React from "react";
import { useContextTranslate } from "../../Context/ContextAPI";

const Currency = ({ number, currency }) => {
  const { profile } = useContextTranslate();
  const isUSD = profile?.currency === "USD";
  const rawNumber = Number(number);

  let displayNumber = "0";

  if (isUSD) {
    const formatted = rawNumber.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    // If formatted is 0.00 but actual number is small and non-zero, show full number
    if (formatted === "0.00" && rawNumber > 0 && rawNumber < 0.01) {
      displayNumber = rawNumber.toLocaleString(undefined, {
        maximumFractionDigits: 6,
        minimumFractionDigits: 3,
      });
    } else {
      displayNumber = formatted;
    }
  } else {
    displayNumber = parseInt(rawNumber).toLocaleString() || "0";
  }

  return (
    <span>
      {displayNumber}{" "}{currency || profile?.currency || ""}
    </span>
  );
};

export default Currency;
