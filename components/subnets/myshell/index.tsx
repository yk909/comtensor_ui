"use client"
import { useRef, useState, useEffect } from "react";
import MessageItem from "./item";



const MyShellSubnet = () => {
    const inputRef = useRef<HTMLInputElement|null>(null);
    const [inputVal, setInputValue] = useState<string>('');
    const [conversation, setConversation] = useState<string[]>([]);
    const conversationScroll = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                sendMessage();
            }
         }
         
         const inputElement = inputRef.current!;
   
         if(inputElement) {
            inputElement.addEventListener('keypress', handleKeyPress);
   
            return () => {
               inputElement.removeEventListener('keypress', handleKeyPress);
            };
         }

    }, [inputVal]);

    useEffect(() => {

        if(conversationScroll.current) {
            const targetScrollTop = conversationScroll.current.scrollHeight - conversationScroll.current.clientHeight;
            conversationScroll.current.scrollTop = targetScrollTop;
        }

    }, [conversation]);


    const onSendQueryHandle = async() => {

        setConversation(prev =>  [...prev, inputVal]);

        setLoading(true);

        setLoading(false);
    }
    

    const sendMessage = () => {
        if(inputVal == '') {
            return;
        }

        onSendQueryHandle();
        setInputValue('');
    }


    return (
        <div className='mt-[30px] '>
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="h2 mb-4">MyShell powered by ComTensor</h1>
            </div>
            <div className='mt-[20px] border-[2px] border-[#5D5DFF] rounded-[20px] sm:px-[10px] py-[60px] relative bg-[#1f2330] max-w-[860px] mx-auto'>
                <div ref={conversationScroll} className='h-[480px] mb-[30px]  overflow-y-scroll light-scroll-bar'>
                    <div className='mx-[10px] sm:mx-[30px] space-y-2'>
                        {
                            conversation.map((conv, idx) => (
                                <MessageItem message={conv} key={idx}/>
                            ))
                        }
                    </div>
                </div>
                <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex justify-center w-full px-[20px]">
                    <div className='w-full sm:w-[540px] md:w-[640px] mx-auto relative'>
                        <input ref={inputRef} value={inputVal} onChange={(e) => setInputValue(e.target.value)}  disabled={loading}
                            className="w-full bg-gray-500 py-5 px-3 rounded-xl outline-none 
                                hover:bg-[#303846] focus:bg-[#303846] focus:border-primary duration-300 transition-all "
                            type="text" placeholder="Type ..."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MyShellSubnet;