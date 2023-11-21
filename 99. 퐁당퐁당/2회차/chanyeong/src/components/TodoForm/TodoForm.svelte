<script lang="ts">
    import { v4 as uuidv4} from 'uuid';

    import { $todos as todos } from '../../stores/todos.store'

    let content = "";

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        if (content.trim()) {
            const id = uuidv4();
            const currentTodos = todos.get();
            const newTodo = { id, content };

            todos.set([...currentTodos, newTodo]);

            content = "";
        }
    }
</script>

<div class="form_wrapper">
    <form on:submit={handleSubmit}>
        <input type="text" name="content" bind:value={content} />
        <button type="submit">insert</button>
    </form>
</div>

<style>
    .form_wrapper {
        margin-bottom: 14px;
    }
</style>