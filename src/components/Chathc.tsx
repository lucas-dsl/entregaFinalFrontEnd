import { useState } from "react";

interface ChatHCProps {
    chatOpen: boolean;
    setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHC: React.FC<ChatHCProps> = ({ chatOpen, setChatOpen }) => {
    const [message, setMessage] = useState("");

    return (
        <div className="fixed bottom-6 right-6">
            <button
                className="p-3 bg-cyan-700 text-white rounded-full shadow-lg hover:bg-cyan-800 transition"
                onClick={() => setChatOpen(!chatOpen)}
            >
                💬
            </button>

            {chatOpen && (
                <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col mt-3">
                    <div className="bg-cyan-700 text-white p-3 rounded-t-lg">
                        Chat HC
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto text-sm text-gray-700">
                        <p><strong>HC:</strong> Olá! Como posso ajudar?</p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (message.trim()) {
                                alert(`Mensagem enviada: ${message}`);
                                setMessage("");
                            }
                        }}
                        className="flex p-2 border-t"
                    >
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 p-2 border rounded-l-md"
                            placeholder="Digite sua mensagem..."
                        />
                        <button
                            type="submit"
                            className="px-4 bg-cyan-700 text-white rounded-r-md hover:bg-cyan-800"
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatHC;
