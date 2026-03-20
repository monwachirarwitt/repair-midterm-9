import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUserStore from '../stores/userStore';

function TodolistPage() {
    const user = useUserStore(state => state.user);
    const [list, setlist] = useState([]);
    const [content, setcontent] = useState("");


    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        if (user?.userId) {
            getUser();
        }
    }, [user]);


    async function getUser() {
        try {
            const res = await axios.get(`https://mt-todolist-backend.onrender.com/todos/${user.userId}`);
            setlist(res.data);
        } catch (err) {
            console.error(err);
        }
    }


    async function getUseradd() {
        if (!content.trim()) return;
        try {
            const res = await axios.post(`https://mt-todolist-backend.onrender.com/todos/${user.userId}`, {
                content: content
            });
            setlist((prev) => [...prev, res.data]);
            setcontent("");
        } catch (err) {
            console.error(err);
        }
    }


    async function getUserdelete(todoId) {
        try {
            await axios.delete(`https://mt-todolist-backend.onrender.com/todos/${user.userId}/${todoId}`);
            setlist((prev) => prev.filter((obj) => obj.id !== todoId));
        } catch (err) {
            console.error(err);
        }
    }


    function startEdit(todo) {
        setEditingId(todo.id);
        setEditContent(todo.content);
    }


    async function handleSaveEdit(todoId) {
        if (!editContent.trim()) return;
        try {

            await axios.put(`https://mt-todolist-backend.onrender.com/todos/${user.userId}/${todoId}`, {
                content: editContent
            });


            setlist((prev) => prev.map((obj) =>
                obj.id === todoId ? { ...obj, content: editContent } : obj
            ));


            setEditingId(null);
            setEditContent("");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl flex flex-col">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Todo List</h1>


                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={content}
                        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="add"
                        onChange={(event) => setcontent(event.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && getUseradd()}
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all cursor-pointer"
                        onClick={getUseradd}
                    >
                        Add
                    </button>
                </div>


                <div className="flex flex-col gap-3">
                    {list.map((el) => (
                        <div key={el.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-md transition-all group">


                            {editingId === el.id ? (
                                <div className="flex flex-1 gap-2 mr-2">
                                    <input
                                        type="text"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="flex-1 border border-blue-300 px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => handleSaveEdit(el.id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-all cursor-pointer"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-sm transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>

                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded cursor-pointer accent-blue-500" />
                                        <span className="text-gray-700 text-lg">{el.content}</span>
                                    </div>

                                    <div className="flex gap-2 opacity-100 transition-opacity">
                                        <button
                                            className="bg-amber-400 hover:bg-amber-500 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer"
                                            onClick={() => startEdit(el)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer"
                                            onClick={() => getUserdelete(el.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default TodolistPage;