
// 引入 express
const express = require('express');

// 创建一个 Express 应用
const app = express();

// 让 Express 支持 JSON 请求体解析
app.use(express.json());

// 临时存储的任务数据（通常应该存储在数据库中）
let tasks = [
  { id: 1, title: '任务1', description: '描述1', reward: 100, status: '待接取' },
  { id: 2, title: '任务2', description: '描述2', reward: 200, status: '待接取' }
];

// 获取所有任务接口 (GET)
app.get('/api/tasks', (req, res) => {
  res.json(tasks);  // 返回任务数组
});

// 发布任务接口 (POST)
app.post('/api/tasks', (req, res) => {
  const { title, description, reward } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    reward,
    status: '待接取'
  };
  tasks.push(newTask);  // 添加到任务数组
  res.status(201).json(newTask);  // 返回创建的任务
});

// 接取任务接口 (POST)
app.post('/api/tasks/:id/accept', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: '任务未找到' });
  }
  task.status = '已接取';  // 更新任务状态
  res.json(task);  // 返回更新后的任务
});

// 提交评价接口 (POST)
app.post('/api/tasks/:id/review', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { rating } = req.body;
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: '任务未找到' });
  }
  task.rating = rating;  // 保存评价
  res.json({ message: '评价成功', task });  // 返回评价结果
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
