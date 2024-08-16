import { formatMoney } from "../scripts/utils/money.js";

describe('testeo formato', ()=>{
  it('convertir centavos ',()=>{
    expect(formatMoney(2095)).toEqual('20.95');
  } );
  it('con 0', ()=>{
    expect(formatMoney(0)).toEqual('0.00');
  })
  it('con .5',()=>{
    expect(formatMoney(2000.5)).toEqual('20.01');
  })
});
