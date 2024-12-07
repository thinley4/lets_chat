import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.jpg"

export function UserChat({ chat, user }) {
  const {recipientUser} = useFetchRecipient(chat, user);

  // console.log(recipientUser);

  return (
    <>
      <button className="w-full flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
          />
          <div>
            <div>{recipientUser?.name}</div>
            <div>Text Message</div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <div className="bg-green-700 w-3 h-3 rounded"></div>

          </div>
          <div>Date</div>
          <div className="p-0.5 rounded-full bg-blue-600 text-white">2</div>
        </div>
      </button>
      <div className=" pt-2 border-b-4 border-indigo-500 ..."></div>
    </>
  )
}
