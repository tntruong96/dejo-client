import { FormatCurrency } from '@utils/formatCurrency';
import { Divider } from 'antd';
import React from 'react';
import { useState } from 'react';
import { SummaryWrapper } from './style';

interface Props {
    subtotal: number;
    total: number;
    handlePromodeCode: (promodeCode:string) => void
}

const SummaryCart: React.FC<Props> = ({subtotal, total, handlePromodeCode}) => {
    const [visible, setVisible] = useState(false);
    const [promodeCode, setPromodeCode] = useState('');


    return (
        <SummaryWrapper>
            <h3>SUMMARY</h3>
            <div className='flex items-center my-5'>
            <input type="checkbox" onChange={() => setVisible(prev => !prev)} />
            <label className='ml-2'>I Have Promode Code</label>
            </div>
            <div className={`w-full border-2 flex relative p-2 ${visible ? "inline" : "hidden"}`}>
                <input className='w-full' placeholder='Input your code' onChange={(e) => setPromodeCode(e.target.value)}/>
                <button className='' onClick={() => handlePromodeCode(promodeCode)}>APPLY</button>
            </div>
            <Divider/>
            <div className='flex justify-between'>
                <h4>SUBTOTAL</h4>
                <p>{FormatCurrency( subtotal)}</p>
            </div>
            <div className='flex justify-between'>
                <h4>SHIPPING COST</h4>
                <p className='ml-5'>CALCULATED AT NEXT STEP</p>
            </div>
            <Divider/>
            <div className='flex justify-between'>
                <h3>TOTAL</h3>
                <p>{FormatCurrency(total)}</p>
            </div>
            <button className='btn'>CHECK OUT</button>
        </SummaryWrapper>
    );
};

export default SummaryCart;