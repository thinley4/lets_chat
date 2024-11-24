import { useState } from "react";
import { socket } from '../socket';

export function PrivateMsgForm({privateMessages}) {
    const [value, setValue] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        socket.emit('private_message', value, "thinley");
        setValue('');
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={value} onChange={e => setValue(e.target.value)} />
                <button type="submit">Send</button>
            </form>
            {
                privateMessages.map((msg, index) => 
                    <div key={index}>From- {msg.from}: {msg.content}</div>
                )
            }
        </div>
    )
}