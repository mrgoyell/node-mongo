const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [
    {   
        _id: new ObjectID(),
        text:"this is part1"
    },
    {
        _id: new ObjectID(),
        text:"This is part2"
    }
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
});

describe('GET /todos/:id',()=>{
    it('Should return todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect(res=>{
            expect(res.body.todos.text).toBe(todos[0].text);
        })
        .end(done());
    });

    it('should return 404 if todo not found',done=>{
        request(app)
        .get(`/todos/${todos[1]._id.toHexString()}`)
        .expect(404)
        .end(done());
    });

    it('Should return 404 for non-object ids',(done)=>{
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done());
    });
});