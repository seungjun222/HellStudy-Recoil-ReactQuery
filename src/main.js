import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateData, DeleteData, ReadData, UpdateData } from "./api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { textState } from "./store/store";

export default function Main() {
  const navigate = useNavigate();
  const [c, d] = useRecoilState(textState);
  const [todo, setTodo] = useState({ title: "" });
  const [editTodo, setEditTodo] = useState({ title: "" });
  const [targetId, setTargetId] = useState(null);

  const queryClient = useQueryClient();

  const { data: isData } = useQuery(["todos"], ReadData, {
    refetchOnWindowFocus: true,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (response) => {},
  });

  const { mutate: AddMutate } = useMutation(CreateData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // 데이터 삭제
  const { mutate: DeleteMutate } = useMutation(DeleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // 데이터 수정
  const { mutate: UpdateMutate } = useMutation(UpdateData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // Create 함수 mutate
  const onAddData = (todo) => {
    AddMutate(todo);
  };

  // Delete 함수 mutate
  const onDeleteData = (todoId) => {
    DeleteMutate(todoId);
  };

  // Update 함수 mutate
  const onUpdateData = (todoId, editData) => {
    UpdateMutate({ todoId, editData });
  };

  const onrecoil = () => {
    // event.defaultPrevent();
    d("초기값");
  };

  return (
    <div>
      <button
        onClick={() => {
          onrecoil();
        }}
      >
        값 변경
      </button>
      <br />
      {c}
      <br />
      <button
        onClick={() => {
          navigate("/test");
        }}
      >
        test
      </button>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAddData(todo);
        }}
      >
        <input
          type="text"
          onChange={(event) => {
            const { value } = event.target;
            setTodo({ ...todo, title: value });
          }}
        />
        <button>추가하기</button>

        <div>
          <input
            type="text"
            placeholder="수정하고싶은 ID"
            onChange={(event) => {
              setTargetId(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정값 입력"
            onChange={(event) => {
              setEditTodo({
                ...editTodo,
                title: event.target.value,
              });
            }}
          />
          <button
            type="button"
            onClick={() => {
              onUpdateData(targetId, editTodo);
            }}
          >
            수정하기
          </button>
        </div>
      </form>
      <div>
        {isData?.map((todo) => (
          <div key={todo.id}>
            {todo.id} : {todo.title}
            <button
              onClick={() => {
                onDeleteData(todo.id);
              }}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
