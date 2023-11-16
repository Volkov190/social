import { gql } from "@/__generated__";
import { DialogUsersQuery, GetMessagesToQuery } from "@/__generated__/graphql";
import { GET_USER_MESSAGES_TO } from "@/entities/message/api";
import { GET_DIALOG_USERS } from "@/entities/user/api";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import classnames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface MessageFormValues {
  message: string;
}

const SEND_MESSAGE_MUTATION = gql(`#graphql
  mutation AddMessage($inputMessage: InputMessage!) {
    addMessage(message: $inputMessage) {
        id
        text
        fromUserId
        toUserId
    }
  }
`);

const NEW_MESSAGE_SUBSCRIPTION = gql(`#graphql
  subscription MessageSended {
    messageSended {
        id
        text
        fromUserId
        toUserId
    }
  }
`);

const MessagesPage = () => {
  const { data: users } = useQuery(GET_DIALOG_USERS);
  const [selectedUser, setSelectedUser] =
    useState<DialogUsersQuery["users"][number]>();

  const [messages, setMessages] =
    useState<GetMessagesToQuery["getMessagesTo"]>();

  const { refetch: refetchMessages } = useQuery(GET_USER_MESSAGES_TO, {
    variables: selectedUser ? { userToIdParam: selectedUser.id } : undefined,
    onCompleted: (data) => setMessages(data.getMessagesTo),
  });

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  const { handleSubmit, register, resetField } = useForm<MessageFormValues>({
    defaultValues: { message: "" },
  });

  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    onData: (data) => {
      if (
        data.data.data?.messageSended &&
        selectedUser?.id === data.data.data.messageSended.fromUserId
      ) {
        setMessages((messages) => [
          ...(messages ?? []),
          data.data.data!.messageSended,
        ]);
      }
    },
  });

  const fetchMessgaes = async () => {
    try {
      await refetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!selectedUser) return;
    fetchMessgaes();
  }, [selectedUser]);

  const submitHandler = useCallback<SubmitHandler<MessageFormValues>>(
    async (values) => {
      if (!values.message || !selectedUser) return;
      try {
        const sendedMessage = (
          await sendMessage({
            variables: {
              inputMessage: { text: values.message, toUserId: selectedUser.id },
            },
          })
        ).data?.addMessage;
        setMessages((messages) =>
          messages
            ? [...messages, ...(sendedMessage ? [sendedMessage] : [])]
            : undefined
        );
        resetField("message");
      } catch (err) {
        console.error(err);
      }
    },
    [resetField, selectedUser, sendMessage]
  );

  if (!users) return "Нет пользователей";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="py-8 bg-primary rounded-md">
          {users.users.map((user) => (
            <div
              className={classnames(
                "hover:bg-secondary w-full cursor-pointer px-8 py-2",
                user.id === selectedUser?.id && "bg-secondary"
              )}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
        <div className="w-full max-h-[80vh]">
          {selectedUser && (
            <div className="flex flex-col gap-4 max-h-full">
              <div className="bg-primary p-4 rounded-md">
                Диалог с {selectedUser.name}
              </div>
              <div className="overflow-auto">
                {messages?.map((message) => (
                  <div
                    className={classnames(
                      "p-2",
                      message.toUserId !== selectedUser.id
                        ? "text-right "
                        : undefined
                    )}
                  >
                    <span className="p-2 rounded-md bg-secondary">
                      {message.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <form
        className="bg-primary rounded-md flex gap-4 p-2"
        onSubmit={handleSubmit(submitHandler)}
      >
        <input
          {...register("message")}
          autoComplete="off"
          className="w-full focus-visible:outline-none px-8 bg-background"
        />
        <button type="submit" className="bg-accent rounded-lg text-background">
          Отправить сообщение
        </button>
      </form>
    </div>
  );
};

export default MessagesPage;
