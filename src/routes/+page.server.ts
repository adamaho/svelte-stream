import type { Actions } from "./$types";

import { chatroom } from "$lib/server/chatroom";

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const message = data.get("message");
		if (message) {
			chatroom.send(message as string);
			return { success: true };
		}

		return { success: false }
	}
};
