// build.js —— 唯一内容源。运行 `node build.js` 生成每个科目独立的 HTML + 首页 index.html
const fs = require('fs');
const path = require('path');

let _c = 0;
const _id = () => 'n' + (_c++);
const L = (name, desc, key, exam) => ({ id: _id(), name, desc: desc || '', status: 0, key: key || undefined, exam: exam || undefined });
const N = (name, desc, children, exam) => ({ id: _id(), name, desc: desc || '', open: false, children, exam: exam || undefined });

function micro() {
  _c = 0;
  const modules = [
    N('引论', '西方经济学到底研究什么', [
      L('稀缺性与资源配置', '资源有限、欲望无限——经济学的出发点'),
      L('微观与宏观经济学的区分'),
      L('实证分析与规范分析', '“是什么” vs “应该怎样”'),
      L('经济模型与基本假设（理性人）')]),
    N('需求、供给和均衡价格', '价格是怎样被供求决定的', [
      N('需求', null, [L('需求函数与需求表'), L('需求曲线与需求定理'), L('需求量变动 vs 需求变动', '沿曲线移动 vs 整条曲线平移')]),
      N('供给', null, [L('供给函数'), L('供给曲线与供给定理'), L('供给量变动 vs 供给变动')]),
      L('均衡价格的决定与变动', '供求相等时的价格'),
      N('弹性', '衡量一个量对另一个量变化的敏感程度', [L('需求价格弹性', '需求量对价格变化有多敏感'), L('点弹性与弧弹性'), L('弹性与厂商收益的关系'), L('需求收入弹性'), L('需求交叉弹性'), L('供给价格弹性')]),
      N('供求理论的应用', null, [L('支持价格与限制价格'), L('税收归宿'), L('蛛网模型')])]),
    N('效用论', '消费者如何做选择', [
      L('效用的概念（基数效用 vs 序数效用）'),
      N('边际效用分析（基数效用论）', null, [L('总效用与边际效用'), L('边际效用递减规律'), L('消费者均衡（基数）'), L('消费者剩余')]),
      N('无差异曲线分析（序数效用论）', null, [L('无差异曲线及其特征'), L('商品边际替代率（递减）'), L('预算线'), L('消费者均衡（序数）')]),
      N('价格与收入变化的影响', null, [L('价格-消费曲线与需求曲线'), L('收入-消费曲线与恩格尔曲线')]),
      L('替代效应与收入效应', '价格变动里，一部分因相对变贵、一部分因实际购买力变化'),
      L('正常品、低档品与吉芬品'),
      L('不确定性下的选择（期望效用、风险态度）')]),
    N('生产论', '企业如何用要素生产', [
      L('厂商（企业的性质与目标）'),
      L('生产函数（柯布-道格拉斯等）'),
      N('短期生产（一种可变要素）', null, [L('总产量、平均产量、边际产量'), L('边际报酬递减规律'), L('生产的三个阶段')]),
      N('长期生产（两种可变要素）', null, [L('等产量线'), L('边际技术替代率（递减）'), L('等成本线'), L('最优要素组合')]),
      L('规模报酬（递增/不变/递减）')]),
    N('成本论', '生产的代价', [
      L('机会成本'),
      L('显成本、隐成本与经济利润、正常利润'),
      N('短期成本', null, [L('TC / TFC / TVC'), L('AC / AFC / AVC / MC'), L('各成本曲线之间的关系')]),
      N('长期成本', null, [L('长期总成本、平均成本、边际成本'), L('长期与短期成本的关系（包络线）')]),
      L('规模经济与规模不经济')]),
    N('完全竞争市场', '价格接受者的世界', [
      L('市场结构的划分'),
      L('完全竞争的特征与厂商的需求、收益曲线'),
      N('短期均衡', null, [L('MR=MC 原则'), L('盈亏分析与停止营业点'), L('短期供给曲线')]),
      L('长期均衡'),
      L('行业的长期供给曲线'),
      L('完全竞争市场的效率评价')]),
    N('不完全竞争市场', '垄断、垄断竞争与寡头', [
      N('垄断', null, [L('垄断的成因与特征'), L('垄断厂商的需求与收益'), L('短期与长期均衡'), L('价格歧视（一级/二级/三级）'), L('垄断的低效率')]),
      N('垄断竞争', null, [L('特征'), L('短期与长期均衡')]),
      N('寡头', null, [L('古诺模型'), L('斯威齐模型（弯折的需求曲线）'), L('价格领导与卡特尔')]),
      L('四种市场结构的比较')]),
    N('生产要素价格的决定', '工资、利息、地租、利润从哪来', [
      L('要素需求是“引致需求”'),
      L('边际生产力理论（VMP = 要素价格）'),
      L('完全竞争下要素的需求与供给'),
      L('工资（劳动供给、闲暇与收入）'),
      L('利息（资本与利率）'),
      L('地租（准租金、经济租）'),
      L('利润'),
      L('洛伦兹曲线与基尼系数', '衡量收入分配是否平等')]),
    N('一般均衡论与福利经济学', '整个市场体系的效率', [
      L('局部均衡与一般均衡'),
      L('帕累托最优', '没法在不损害他人的前提下让任何人更好的状态'),
      N('帕累托最优的条件', null, [L('交换的最优'), L('生产的最优'), L('交换与生产的最优')]),
      L('完全竞争与帕累托最优'),
      L('社会福利函数'),
      L('效率与公平')]),
    N('博弈论初步', '互相影响时怎么决策', [
      L('博弈的基本要素（参与人、策略、支付）'),
      L('占优策略均衡'),
      L('纳什均衡', '谁单独改变策略都不会更好的状态'),
      L('囚徒困境'),
      L('重复博弈与序贯博弈（简介）')]),
    N('市场失灵和微观经济政策', '市场失效时怎么办', [
      L('垄断与反垄断、政府规制'),
      N('外部性', '一个人的行为影响了别人却没付出或得到相应代价', [L('正外部性与负外部性'), L('庇古税'), L('科斯定理')]),
      L('公共物品（非竞争性、非排他性、搭便车）'),
      N('信息不完全', null, [L('逆向选择（旧车市场）'), L('道德风险'), L('委托-代理问题')])])
  ];
  modules[0].open = true;
  return { id: 'micro', name: '微观经济学', modules };
}
function macro() {
  _c = 0;
  const modules = [
    N('国民收入核算', '给整个经济的产出记账', [
      L('宏观经济学的特点'),
      L('GDP 的概念（最终产品、市场价值、流量）'),
      N('核算方法', null, [L('支出法'), L('收入法'), L('生产法')]),
      L('五个总量（GDP/NDP/NI/PI/DPI）'),
      L('名义 GDP 与实际 GDP、GDP 平减指数'),
      L('国民收入的基本恒等式')]),
    N('国民收入决定：收入-支出模型', '最简单的国民收入决定', [
      L('均衡产出（总需求 = 总产出）'),
      N('消费与储蓄', null, [L('消费函数（APC / MPC）'), L('储蓄函数')]),
      L('两部门均衡国民收入的决定'),
      L('投资乘数', '一笔投资会带来成倍的收入增加'),
      N('三、四部门与各种乘数', null, [L('政府购买乘数'), L('税收乘数'), L('转移支付乘数'), L('平衡预算乘数'), L('对外贸易乘数')])]),
    N('国民收入决定：IS-LM 模型', '商品市场与货币市场共同决定收入和利率', [
      L('投资函数（投资与利率、资本边际效率）'),
      L('IS 曲线（推导、斜率、移动）', '商品市场均衡的“收入-利率”组合'),
      N('利率的决定', null, [L('货币需求（交易/预防/投机动机）'), L('货币供给'), L('流动性陷阱')]),
      L('LM 曲线（推导、斜率、三区域、移动）', '货币市场均衡的“收入-利率”组合'),
      L('IS-LM 模型的一般均衡'),
      L('凯恩斯的基本理论框架')]),
    N('国民收入决定：AD-AS 模型', '总需求与总供给', [
      L('总需求曲线（推导、斜率、移动）'),
      N('总供给', null, [L('劳动市场与生产函数'), L('长期总供给曲线（古典）'), L('短期总供给曲线')]),
      L('AD-AS 模型对现实的解释')]),
    N('失业与通货膨胀', null, [
      N('失业', null, [L('失业的类型'), L('自然失业率'), L('奥肯定律', '失业率与产出缺口之间的经验关系')]),
      N('通货膨胀', null, [L('通胀的衡量'), L('需求拉动型通胀'), L('成本推动型通胀'), L('通胀的影响')]),
      L('菲利普斯曲线', '失业与通胀的权衡：短期、长期、附加预期')]),
    N('宏观经济政策', '政府如何调控经济', [
      L('宏观经济政策目标'),
      N('财政政策', null, [L('财政政策工具'), L('自动稳定器'), L('斟酌使用的财政政策'), L('挤出效应'), L('功能财政与赤字')]),
      N('货币政策', null, [L('商业银行与存款创造、货币乘数'), L('中央银行与货币政策工具'), L('货币政策的传导机制'), L('货币政策的效果')]),
      L('财政政策与货币政策的配合'),
      L('关于宏观经济政策的争论')]),
    N('开放经济下的短期模型', '加入对外贸易与资本流动', [
      L('汇率与汇率制度'),
      L('净出口函数'),
      L('国际收支与 BP 曲线'),
      L('蒙代尔-弗莱明模型（IS-LM-BP）'),
      N('开放经济下的政策效果', null, [L('固定汇率制下'), L('浮动汇率制下')])]),
    N('经济增长', '长期的产出增长', [
      L('经济增长的概念与事实'),
      L('增长核算与全要素生产率'),
      L('哈罗德-多马模型'),
      N('新古典增长模型（索洛模型）', '储蓄、人口、技术如何决定长期增长', [L('稳态'), L('储蓄率与人口增长的影响'), L('技术进步'), L('黄金分割律')]),
      L('内生增长理论'),
      L('促进经济增长的政策')]),
    N('宏观经济学的微观基础', null, [
      N('消费理论', null, [L('生命周期假说'), L('持久收入假说')]),
      N('投资理论', null, [L('加速数模型'), L('托宾 q 理论')]),
      L('货币需求理论')]),
    N('宏观经济学流派', '不同学派的争论与共识', [
      L('凯恩斯主义'),
      L('货币主义'),
      L('新古典宏观经济学（理性预期、实际经济周期）'),
      L('新凯恩斯主义'),
      L('供给学派')])
  ];
  modules[0].open = true;
  return { id: 'macro', name: '宏观经济学', modules };
}

const subjects = [micro(), macro()];

const fileFor = s => s.name + '.html';

const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
subjects.forEach(s => {
  const html = tpl.split('__SUBJECT_JSON__').join(JSON.stringify(s)).split('__SUBJECT_NAME__').join(s.name);
  fs.writeFileSync(path.join(__dirname, fileFor(s)), html, 'utf8');
  console.log('生成', fileFor(s));
});

// 首页 index.html（科目入口，显示各科进度）
const cards = subjects.map(s => `    {id:'${s.id}',name:'${s.name}',file:'${encodeURIComponent(fileFor(s))}'}`).join(',\n');
const index = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>考研经济学 · 学习进度地图</title>
<style>
:root{--paper:#F4F6F1;--surface:#fff;--ink:#1E241C;--muted:#6E7566;--faint:#9AA191;--hair:#E5E9DF;--accent:#2E5E3D;--accent-soft:#EAF1E9;--font:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;--num:ui-monospace,Menlo,monospace;}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--font);}
.wrap{max-width:760px;margin:0 auto;padding:56px 22px 60px}
h1{font-size:27px;margin:0 0 6px;letter-spacing:-.5px}.lead{color:var(--muted);font-size:14px;margin:0 0 30px}
.grid{display:grid;gap:14px}
.card{display:flex;align-items:center;gap:18px;background:var(--surface);border:1px solid var(--hair);border-radius:16px;padding:20px 22px;text-decoration:none;color:inherit;transition:.14s}
.card:hover{border-color:var(--accent);transform:translateY(-1px);box-shadow:0 6px 20px rgba(30,36,28,.06)}
.ring{flex:0 0 auto;position:relative;width:64px;height:64px}.ring svg{transform:rotate(-90deg)}
.ring span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--num);font-size:15px;font-weight:600;color:var(--accent)}
.c-main{flex:1 1 auto}.c-name{font-size:18px;font-weight:700}.c-sub{font-size:12.5px;color:var(--faint);margin-top:3px}
.arrow{flex:0 0 auto;color:var(--faint);font-size:20px}
.foot{margin-top:34px;color:var(--faint);font-size:12px;text-align:center;line-height:1.7}
</style></head><body><div class="wrap">
<h1>考研经济学 · 学习进度地图</h1>
<p class="lead">西方经济学（高鸿业）微观与宏观两门，进度与笔记互不干扰。点进去学习、追溯前置、按需细分、导出复盘。</p>
<div class="grid" id="grid"></div>
<p class="foot">进度保存在本机 · 各科目可单独使用与分发</p>
</div><script>
const SUBJECTS=[
${cards}
];
const C=2*Math.PI*26;
function readP(id){try{const v=localStorage.getItem('km-'+id+'-progress');if(v){const o=JSON.parse(v);return o;}}catch(e){}return {done:0,total:0};}
document.getElementById('grid').innerHTML=SUBJECTS.map(s=>{const p=readP(s.id);const pct=p.total?Math.round(p.done/p.total*100):0;const len=p.total?p.done/p.total*C:0;
return '<a class="card" href="'+s.file+'"><div class="ring"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="#E5E9DF" stroke-width="6"/><circle cx="32" cy="32" r="26" fill="none" stroke="#3F7A4E" stroke-width="6" stroke-linecap="round" stroke-dasharray="'+len+' 999"/></svg><span>'+pct+'%</span></div><div class="c-main"><div class="c-name">'+s.name+'</div><div class="c-sub">已掌握 '+p.done+' / '+p.total+' 个知识点</div></div><div class="arrow">→</div></a>';}).join('');
</script></body></html>`;
fs.writeFileSync(path.join(__dirname, 'index.html'), index, 'utf8');
console.log('生成 index.html（首页）');
console.log('完成。');
