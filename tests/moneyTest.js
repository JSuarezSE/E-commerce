import { formatMoney } from "../scripts/utils/money.js";

if (formatMoney(2095)==='20.95'){
  console.log('bien');
} else {
  console.log('mal');
}
if (formatMoney(0)==='0.00') {
  console.log('bien')
} else {
  console.log('mal')
}