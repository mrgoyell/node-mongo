const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

let todos = [
    {text:"this is part1"},
    {text:"This is part2"}
];

beforeEach((done)=>{
    Todo.deleteMany({})
    .then(()=>{
        Todo.insertMany(todos);
        done();
    });
});

describe('Post /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = 'Testing...';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });

    it('Should not create a todo',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todo)=>{
                expect(todo.length).toBe(2);
                done();
            },(e)=>{
                done(e);
            });
        });
    });
});

describe('GET /todos',()=>{
    it('Should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
})