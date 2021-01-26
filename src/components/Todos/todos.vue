<template>
    <div>
        <AddTodo />
        <FilterTodos />
        <h3>Todos</h3>
        <div class="legend">
            <span>double click to mark complete</span>
            <span>
                <span class="incomplete-box">Incomplete</span>
            </span>
            <span>
                <span class="complete-box">Complete</span>
            </span>
        </div>
        <div class="todos">
            <div 
                @dblclick="onDblClick(todo)" 
                v-for="todo in allTodos" 
                :key="todo.id" 
                class="todo"
                v-bind:class="{'is-complete':todo.completed}"
                >
                {{todo.title}}
                {{todo.body}}
                <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>    
</template>

<script>
import FilterTodos from '../Todos/FilterTodos'
import AddTodo from '../Todos/AddTodo'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        AddTodo,
        FilterTodos
    },
    name: 'Todos',
    methods: {
        ...mapActions([
            'fetchTodos', 
            'getProfile', 
            'deleteTodo', 
            'updateTodo'
        ]),
        onDblClick(todo) {
            const updTodo = {
                id: todo.id,
                title: todo.title,
                body: todo.body,
                created_by: todo.created_by,
                completed: !todo.completed,
            }
            this.updateTodo(updTodo)
        }
    },
    computed: {
        ...mapGetters(['allTodos', 'getUser'])    
    },
    created() {
        this.fetchTodos()
        this.getProfile()
    },
    
}
</script>

<style scoped>
.legend {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
}
.incomplete-box {
    display: inline-block;
    width:10px;
    height:10px;
    background-color: #41b883;
}
.complete-box {
    display: inline-block;
    width:10px;
    height:10px;
    background-color: #35495e;
}
.is-complete {
    background-color: #35495e!important;
    color: #ffffff;
}
i {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #ffffff;
    cursor: pointer;
}
.todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.todo {
    background-color: #41b883;
    color: #ffffff;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;

}
@media (max-width: 500px) {
    .todos {
        grid-template-columns: 1fr;
    }
}
</style>