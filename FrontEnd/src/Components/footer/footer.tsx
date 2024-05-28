import Image from 'next/image';
import './style.css';

interface FooterProps {
    lead: string;
    totalGustavo: number;
    totalBruna: number;
}

export default function Footer({ lead, totalGustavo, totalBruna }: FooterProps) {
    return (
        <footer className="footer flex items-center justify-around">
            <div className='card-footer flex flex-col justify-center items-center'>
                <h2 className='font-bold text-xl'>Gustavo</h2>
                <h2 className='font-bold text-xl'>{totalGustavo}</h2>
                {
                    lead.length > 1 && lead == "Gustavo" ?
                        <>
                            <Image src="/trophy.png" width={25} height={25} alt='Trophy' />
                        </> :
                        <></>
                }

            </div>
            <div className='card-footer flex flex-col justify-center items-center'>
                <h2 className='font-bold text-xl'>Bruna</h2>
                <h2 className='font-bold text-xl'>{totalBruna}</h2>
                {
                    lead.length > 1 && lead == "Bruna" ?
                        <>
                            <Image src="/trophy.png" width={25} height={25} alt='Trophy' />
                        </> :
                        <></>
                }

            </div>
        </footer>
    );

}