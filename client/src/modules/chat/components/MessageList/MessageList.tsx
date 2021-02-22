import React from "react";
import "./message_list.scss";
import Message from "./Message/Message";
import CreateMessageForm from "./CreateMessageForm/CreateMessageForm";
import { UserType } from "tools/interfaces";

interface PropsType {
  user: UserType,
}

const MessageList: React.FC<PropsType> = ({ user }) => {
  return (
    <div className="message-list">
      <div className="message-list__header">
        <div className="message-list__title">
          {`${user.firstName} ${user.lastName}`}
        </div>
        <div className="message-list__subtitle">
          <div className="message-list__online message-online-icon">
            <div className="message-online-icon__body" />
          </div>
          <p>Online</p>
        </div>
      </div>
      <div className="message-list__body">
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aliquid ex, sed odit cum quia, esse hic illo ullam reprehenderit blanditiis est quidem! Voluptas reiciendis assumenda quod, iure, tenetur rem provident eum eligendi deleniti exercitationem neque! At est ratione mollitia unde praesentium, ducimus maxime eum, iste laudantium impedit cumque perspiciatis eveniet fugit illo magni temporibus vitae error. Quisquam tempora esse rerum odit inventore pariatur at! Laboriosam sit minus nam asperiores eligendi, obcaecati nesciunt, ipsa ex, quae provident minima? Nesciunt saepe repellendus quisquam pariatur ut dignissimos ab tempore officia doloremque blanditiis expedita recusandae omnis illo, maiores error! Laborum qui iusto ipsum!"
          date={1613459614439}
          user={user}
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <CreateMessageForm />
      </div>
    </div>
  );
};

export default MessageList;