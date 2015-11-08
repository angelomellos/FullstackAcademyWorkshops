# Review Week Angular Assessment

## Logistics

- You have 2 hours. This test was designed to be difficult to finish. Get through as much as you can, and if you get stuck on any spec, try moving on – they're not all cumulative.
- You may refer to online resources or notes, but *not* any previous code you've written, nor the study guide, nor may you copy/paste from outside resources.
- There are three extra credit possibilities:
    * The `ng-enter` directive (last spec); `x`'d out to start.
    * The "cached" `Todo` factory; `x`'d out to start.
    * Ensuring that your app is actually entirely functional (see below).

## Getting started

- fork this repo then clone your fork locally
- `npm install && bower install`
- `npm test` (which starts up testem)
- open up [localhost:7357](http://localhost:7357) to view the full HTML report
- start going through the specs
- you should only need to edit the following files. They are listed here in the order we recommend you tackle them, which is the same order they appear in the test report. However, technically speaking they can be solved in any order, so if you get stuck, move on and circle back later.
	- browser/app/todos/todo.factory.js
	- browser/app/todos/list/todo.list.controller.js
	- browser/app/todos/list/todo.list.state.js
	- browser/app/todos/item/todo.item.directive.js
	- browser/app/todos/item/todo.controller.js
	- browser/app/todos/detail/todo.detail.controller.js
	- browser/app/todos/detail/todo.detail.state.js
	- browser/app/todos/edit/todo.edit.controller.js
	- browser/app/todos/edit/todo.edit.state.js
	- browser/utils/ng-enter.directive.js

## Submitting

- `git add -A`
- `git commit -m "Submission for deadline"`
- `git push origin master`
- zip up the folder and email to instructors+assessments@fullstackacademy.com

## Things you should be aware of

- For your code, there will be a frontend global `app` which represents the angular module.
- All of the html is already there, and if you want context for the various contoller methods etc you are building, it could be a good idea to go check out how it is being used in the html.
- You can run `npm start` to fire up a server. Use this if you want to get a sense of what your app actually looks and feels like as you're passing the specs. If so, you can also seed the database with `npm run seed`.
- We think you're swell, so try to just relax and do the best you can.

< g o o d  l u c k 3
