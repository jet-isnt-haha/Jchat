import { create } from 'zustand';
import type { ChatStore } from '~/packages/types/chatType';
import { createSessionSlice } from './sessionSlice';
import { createMessageSlice } from './messageSlice';

export const useChatStore = create<ChatStore>()((...a) => ({
	...createSessionSlice(...a),
	...createMessageSlice(...a)
}));
