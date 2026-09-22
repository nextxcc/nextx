export type Language = 'zh' | 'en';

export interface Translations {
  nav: {
    catalog: string;
    pricing: string;
    advantages: string;
    useCases: string;
    faq: string;
    console: string;
    langSwitchZh: string;
    langSwitchEn: string;
  };
  hero: {
    badge: string;
    titleInstant: string;
    titleGpu: string;
    description: string;
    launchCta: string;
    exploreFleet: string;
    spinUpLatency: string;
    uptimeSla: string;
    availableGpus: string;
    globalCoverage: string;
    regionsUnit: string;
  };
  catalog: {
    titleHighPerf: string;
    titleFleet: string;
    subtitle: string;
    noticeTitle: string;
    noticeDesc: string;
    tabAll: string;
    tabEnterprise: string;
    tabConsumer: string;
    searchPlaceholder: string;
    vram: string;
    arch: string;
    fp16: string;
    interconnect: string;
    onDemand: string;
    spotRate: string;
    estimateBtn: string;
    launchBtn: string;
    hourly: string;
    currencySymbol: string;
    badges: Record<string, string>;
    recommended: Record<string, string[]>;
  };
  pricing: {
    titleDynamic: string;
    titleEstimator: string;
    subtitle: string;
    selectGpu: string;
    gpuInstances: string;
    gpusUnit: string;
    duration: string;
    hoursUnit: string;
    billingTier: string;
    onDemandGuaranteed: string;
    spotDiscount: string;
    summary: string;
    baseRate: string;
    effectiveHourly: string;
    volumeDiscount: string;
    durationDiscount: string;
    estimatedTotal: string;
    savingsVsCloud: string;
    launchWithConfig: string;
    disclaimer: string;
    currencySymbol: string;
  };
  advantages: {
    titleEngineered: string;
    titleAdvantages: string;
    subtitle: string;
    quickConnect: string;
    quickConnectSub: string;
    copied: string;
    copy: string;
    pillars: Record<string, { title: string; spec: string; description: string }>;
  };
  useCases: {
    titlePurpose: string;
    titleWorkloads: string;
    subtitle: string;
    recommended: string;
    cases: Record<string, { name: string; description: string }>;
  };
  faq: {
    titleFaq: string;
    titleQuestions: string;
    subtitle: string;
    items: Record<string, { q: string; a: string; category: string }>;
  };
  footer: {
    tagline: string;
    colPlatform: string;
    colResources: string;
    colSecurity: string;
    zeroLeak: string;
    ghPages: string;
    rights: string;
    contactUs: string;
    navCatalog: string;
    navPricing: string;
    navAdvantages: string;
    navUseCases: string;
    navFaq: string;
    navDocs: string;
    navStatus: string;
  };
  contactModal: {
    title: string;
    subtitle: string;
    emailLabel: string;
    copyBtn: string;
    copiedBtn: string;
    sendEmailBtn: string;
    closeBtn: string;
    slaNotice: string;
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    nav: {
      catalog: '算力规格',
      pricing: '价格估算',
      advantages: '核心优势',
      useCases: '应用场景',
      faq: '常见问题',
      console: '控制台',
      langSwitchZh: '中文',
      langSwitchEn: 'EN',
    },
    hero: {
      badge: '下一代去中心化 GPU 算力云架构',
      titleInstant: '极速高性能',
      titleGpu: 'GPU 算力云平台',
      description:
        '标准化 Docker 容器环境，按分钟/小时弹性计费，秒级启动预装 PyTorch 2.4、CUDA 12.4 与 vLLM 的高密度 AI 镜像。',
      launchCta: '启动 GPU 实例',
      exploreFleet: '探索算力机型',
      spinUpLatency: '容器极速拉起',
      uptimeSla: '稳定运行保障',
      availableGpus: '社区共享算力',
      globalCoverage: '国内算力节点',
      regionsUnit: '',
    },
    catalog: {
      titleHighPerf: '高性能',
      titleFleet: 'GPU 算力集群',
      subtitle: '专为大模型训练、微调与极速推理优化的 NVIDIA Docker 容器算力集群。',
      noticeTitle: '算力供给与效果展示说明',
      noticeDesc:
        '本页面展示的 GPU 机型列表、规格参数及参考价格主要用于界面效果演示与规格参考。本平台采用去中心化/共享算力撮合模式，平台本身暂无自营实体库存，在线算力完全取决于社区节点机主与提供商的实时挂载与出租状态。实际可租机型、实时库存与具体计费以进入控制台后的实时列表为准。欢迎拥有闲置 GPU 设备的朋友入驻共享收益！',
      tabAll: '全部',
      tabEnterprise: '企业级 AI',
      tabConsumer: '消费级',
      searchPlaceholder: '搜索 GPU 机型或架构...',
      vram: '显存',
      arch: '架构',
      fp16: '算力',
      interconnect: '互联',
      onDemand: '按需单价',
      spotRate: 'Spot 竞价',
      estimateBtn: '测算成本',
      launchBtn: '立即开通',
      hourly: '/小时',
      currencySymbol: '¥',
      badges: {
        'Flagship Training': '旗舰训练卡',
        'Industry Standard': '行业标准卡',
        'Most Popular': '最受欢迎',
        'Cost Effective': '超高性价比',
        'Fast Inference': '高并发推理',
        'High Memory': '专业大显存',
        'Flagship Consumer': '次世代旗舰',
        'High Performance': '高能效主力',
        'Sweet Spot': '高性价比甜点',
        'Entry Level AI': '入门级首选',
        'Workstation Grade': '48G 专业工作站',
        'Blackwell Flagship': 'Blackwell 96G 旗舰',
        'Blackwell Ultra 288G': 'Blackwell Ultra 旗舰',
        'Blackwell 192G': 'Blackwell 192G 旗舰',
        'Budget 16G': '超值 16G 首选',
        '16G Inference': '16G 极速推理',
        'Extreme Value': '极致性价比入门',
        'Classic Workhorse': '经典算力中枢',
        'HBM2 Workhorse': 'HBM2 经典高带宽',
        'Turing Inference': '图灵高性价比推理',
      },
      recommended: {
        'b300': ['万亿参数超大模型预训练', '海量 Context 超长上下文推理'],
        'b200': ['超大规模基础大模型训练', '高并发 FP4 吞吐推理'],
        'h100-sxm5': ['超大模型预训练', '全参微调 (70B+)'],
        'h800': ['企业级大模型预训练', '超高并发集群训练'],
        'h20': ['96GB 大显存高并发推理', '超长检索 Context'],
        'a100-sxm4': ['主流大语言模型微调', '科学计算科研'],
        'a800': ['主流大模型微调', '大规模科研并行计算'],
        'rtx-pro-6000': ['96GB 全参微调', '70B+ 大模型私有化部署'],
        'rtx-5090': ['Flux.1 与 4K 超清生图', '32GB 显存模型全参微调'],
        'rtx-5080': ['高能效生图工作流', '轻量级大模型推理'],
        'rtx-5070-ti': ['学术实验复现', 'Diffusion 创作开发'],
        'rtx-5070': ['入门深度学习实战', '小参数模型快速调试'],
        'rtx-5060-ti': ['超高性价比 16G 学习', '个人模型微调'],
        'rtx-4090': ['Stable Diffusion 与生图', 'LoRA 轻量微调'],
        'rtx-4080': ['ComfyUI 高效出图', 'LoRA / QLoRA 微调'],
        'rtx-4070-ti': ['Diffusion 快速生图', '轻量级深度学习'],
        'rtx-4060-ti': ['16GB 大显存高性价推理', '个人 AI 实验'],
        'rtx-3090': ['低成本学习实验', '学术论文复现'],
        'rtx-3080-ti': ['中等规模深度学习', '图像生成创作'],
        'rtx-3060': ['初学者深度学习实战', '低成本模型调试'],
        'rtx-2080-ti': ['22GB 大显存极低成本训练', '高校学术实验'],
        'l40s': ['大模型高吞吐推理', '3D 渲染与图像合成'],
        'rtx-6000-ada': ['48GB 超大显存推理', '专业级大型工作流'],
        'rtx-a6000': ['48GB 工作站全参微调', '超大图像 Diffusion'],
        'a40': ['48GB 高显存推理', '多任务并行 AI 托管'],
        'rtx-a5000': ['专业工作站深度学习', '24GB 多卡协同训练'],
        'a10': ['云端图形渲染与推理', '高性价比模型部署'],
        'v100-32g': ['32GB 经典大显存训练', '标准 FP16 深度学习'],
        'v100-16g': ['经典 Volta 架构训练', '学术基准模型验证'],
        'tesla-t10': ['千元内 16GB 量化推理', 'vLLM / Ollama 本地部署'],
        'tesla-t4': ['70W 低功耗高密度推理', '轻量级视觉模型服务'],
      },
    },
    pricing: {
      titleDynamic: '动态实时',
      titleEstimator: '算力成本估算器',
      subtitle: '弹性按量计费，支持单节点及多卡集群扩展，长租享额外批量折扣。',
      selectGpu: '选择算力机型',
      gpuInstances: '实例卡数',
      gpusUnit: '卡',
      duration: '预估租用时长',
      hoursUnit: '小时',
      billingTier: '计费模式',
      onDemandGuaranteed: '按需实例 (保障可用)',
      spotDiscount: 'Spot 竞价实例 (最高立省 45%)',
      summary: '费用预估汇总',
      baseRate: '基准单价',
      effectiveHourly: '实际等效时薪',
      volumeDiscount: '多卡批量折扣',
      durationDiscount: '时长阶梯折扣',
      estimatedTotal: '预估总费用',
      savingsVsCloud: '较公有云节省',
      launchWithConfig: '以此配置立即启动',
      disclaimer: '※ 算力标价为参考展示价格（计价单位：人民币 ¥）。实际租用费用以控制台内机主实时设定的出租标价为准。',
      currencySymbol: '¥',
    },
    advantages: {
      titleEngineered: '专为开发者打造的',
      titleAdvantages: '核心算力优势',
      subtitle: '基于轻量标准化 Docker 容器极速交付，提供强悍、开箱即用的云端开发环境。',
      quickConnect: '原生终端极速直连',
      quickConnectSub: '实例开通后，使用标准 SSH 密钥通过专属安全隧道秒级登录：',
      copied: '已复制到剪贴板！',
      copy: '复制',
      pillars: {
        'instant-boot': {
          title: '秒级极速拉起',
          spec: '已预热节点秒级交付',
          description: '对机主已提前预热并下载好镜像的算力节点，直连终端秒级开箱即用，免去现场漫长下载等待。',
        },
        'root-ssh': {
          title: '原生 Root SSH 权限',
          spec: '端口映射与密钥认证',
          description: '完整 Root 终端控制权，支持注入 SSH 公钥并分配专属高带宽转发端口。',
        },
        'pay-per-minute': {
          title: '精细计量与履约保障',
          spec: '双方提前取消违约补偿机制',
          description: '按实际运行时间精确计量；支持约定租期，设立出租方与租赁方双向违约金机制，保障租期稳定与双方权益。',
        },
        'turnkey-env': {
          title: '主流 AI 镜像支持',
          spec: '支持机主预热与按需拉取',
          description: '全面支持 PyTorch、CUDA 与 vLLM 等主流环境；开箱即用体验取决于机主是否已提前勾选并下载对应镜像。',
        },
        'bare-metal': {
          title: 'Docker 容器极速直通',
          spec: 'NVIDIA Container Toolkit 直通',
          description: '纯净直通 GPU，基于标准化 Docker 容器极速交付，算力损耗率 < 0.5%，开箱即用。',
        },
        'encrypted-storage': {
          title: '高速加密持久卷',
          spec: 'NVMe 本地数据持久化',
          description: '挂载高速持久化 NVMe 存储卷，容器启停或升级时模型权重与训练数据集安全保留。',
        },
      },
    },
    useCases: {
      titlePurpose: '赋能多样化',
      titleWorkloads: '前沿 AI 实战场景',
      subtitle: '从学术探索到千卡级分布式训练，为每个场景精准匹配算力资源。',
      recommended: '推荐机型',
      cases: {
        'llm-fine-tuning': {
          name: '大模型微调与预训练',
          description: '多卡互联集群，完美承载 7B 至 70B+ 参数模型全参微调与 LoRA 适配。',
        },
        'generative-diffusion': {
          name: '多模态生图与视频生成',
          description: '高速图像生成与视频渲染工作流，配备超大 GDDR6X 显存与 TensorRT 专属加速。',
        },
        'academic-research': {
          name: '高校与学术科研创新',
          description: '高性价比交互式 JupyterLab 环境，轻松复现顶会论文与算法原型验证。',
        },
        'production-inference': {
          name: '高吞吐生产级量化推理',
          description: '超低延迟、高并发服务部署，支持 Continuous Batching、PagedAttention 与 FP8 量化。',
        },
      },
    },
    faq: {
      titleFaq: '常见问题解答',
      titleQuestions: 'FAQ',
      subtitle: '关于计费、连接方式、数据安全性与环境配置的一切解答。',
      items: {
        billing: {
          q: '按小时和按分钟计费是如何运作的？',
          a: '计费以分钟为单位精确计算实例的实际运行时间，无最低使用承诺，停止实例即停止计费。',
          category: '计费规则',
        },
        ssh: {
          q: '如何通过 SSH 连接到我的 GPU 实例？',
          a: '实例创建成功后，控制台会即时生成专属于您的 Root SSH 连接命令与 Web 在线终端入口。',
          category: '连接方式',
        },
        storage: {
          q: '实例重启后我的数据会保留吗？',
          a: '会的。挂载在持久化 NVMe 数据卷中的数据完全独立于容器生命周期，重启或暂停均安全保留。',
          category: '数据存储',
        },
        models: {
          q: '平台提供哪些 GPU 机型？如何选择适合我的配置？',
          a: '平台提供消费级（RTX 5090/5080/5070 Ti/5070/4090/3090/PRO 6000）与企业级（B300/B200/H100/A100）等丰富机型。生图创作用消费级性价比极高，大规模分布式训练推荐企业级 NVLink 集群。',
          category: '机型选型',
        },
        security: {
          q: '多租户隔离与数据安全性如何保证？',
          a: '每个实例均运行在轻量安全的 Docker 容器中，配备独立直通 GPU 与专属持久化存储。',
          category: '安全防护',
        },
      },
    },
    footer: {
      tagline: '新一代去中心化 GPU 算力云平台。极简设计、Docker 容器隔离、分钟级计费、零泄露安全架构。',
      colPlatform: '平台与算力',
      colResources: '资源与文档',
      colSecurity: '架构与合规',
      zeroLeak: '零泄露架构 (Zero-Leak)',
      ghPages: 'GitHub Pages 静态托管',
      rights: '版权所有。保留一切权利。',
      contactUs: '联系我们 (support@nextx.cc)',
      navCatalog: '算力矩阵',
      navPricing: '价格计算',
      navAdvantages: '核心优势',
      navUseCases: '实战场景',
      navFaq: '常见问题',
      navDocs: '开发者文档',
      navStatus: '服务状态',
    },
    contactModal: {
      title: '联系我们',
      subtitle: '如有任何算力租赁需求、定制私有集群或机主节点入驻，欢迎随时与我们沟通。',
      emailLabel: '官方支持邮箱',
      copyBtn: '复制邮箱',
      copiedBtn: '已复制到剪贴板！',
      sendEmailBtn: '直接发送邮件',
      closeBtn: '关闭',
      slaNotice: '工作日通常在 2 小时内快速响应您的邮件。',
    },
  },
  en: {
    nav: {
      catalog: 'GPU Catalog',
      pricing: 'Pricing Estimator',
      advantages: 'Advantages',
      useCases: 'Use Cases',
      faq: 'FAQ',
      console: 'Console',
      langSwitchZh: '中文',
      langSwitchEn: 'EN',
    },
    hero: {
      badge: 'Next-Generation GPU Cloud Architecture',
      titleInstant: 'Instant High-Performance',
      titleGpu: 'GPU Cloud Compute',
      description:
        'Standardized Docker AI containers, fractional per-minute pricing, and instant pre-configured environments (PyTorch, CUDA, vLLM).',
      launchCta: 'Launch GPU Instance',
      exploreFleet: 'Explore Hardware Fleet',
      spinUpLatency: 'Fast Container Spin-Up',
      uptimeSla: 'Reliable Compute SLA',
      availableGpus: 'Community GPU Fleet',
      globalCoverage: 'China Compute Nodes',
      regionsUnit: '',
    },
    catalog: {
      titleHighPerf: 'High-Performance',
      titleFleet: 'GPU Hardware Fleet',
      subtitle:
        'NVIDIA Docker GPU container clusters optimized for deep learning training, fine-tuning, and ultra-low latency inference.',
      noticeTitle: 'Fleet Availability & Demo Notice',
      noticeDesc:
        'The GPU models, hardware specifications, and estimated rates shown below are for platform demonstration and reference. As a decentralized on-demand compute marketplace, live hardware availability strictly depends on community hosts listing their machines. Real-time availability, node specs, and actual rates are confirmed inside the live console. GPU hosts are warmly welcome to onboard and share revenue!',
      tabAll: 'All',
      tabEnterprise: 'Enterprise AI',
      tabConsumer: 'Consumer',
      searchPlaceholder: 'Search GPU models...',
      vram: 'VRAM',
      arch: 'Arch',
      fp16: 'FP16',
      interconnect: 'Interconnect',
      onDemand: 'On-Demand',
      spotRate: 'Spot Rate',
      estimateBtn: 'Estimate Price',
      launchBtn: 'Launch Node',
      hourly: '/hr',
      currencySymbol: '¥',
      badges: {
        'Flagship Training': 'Flagship Training',
        'Industry Standard': 'Industry Standard',
        'Most Popular': 'Most Popular',
        'Cost Effective': 'Cost Effective',
        'Fast Inference': 'Fast Inference',
        'High Memory': 'High Memory',
        'Flagship Consumer': 'Flagship Consumer',
        'High Performance': 'High Performance',
        'Sweet Spot': 'Sweet Spot',
        'Entry Level AI': 'Entry Level AI',
        'Workstation Grade': 'Workstation Grade',
        'Blackwell Flagship': 'Blackwell 96G Flagship',
        'Blackwell Ultra 288G': 'Blackwell Ultra Flagship',
        'Blackwell 192G': 'Blackwell 192G Flagship',
        'Budget 16G': 'Budget 16G',
        '16G Inference': '16G Inference',
        'Extreme Value': 'Extreme Value',
        'Classic Workhorse': 'Classic Workhorse',
        'HBM2 Workhorse': 'HBM2 Workhorse',
        'Turing Inference': 'Turing Inference',
      },
      recommended: {
        'b300': ['1T+ Supermodel Pre-training', 'Massive Context Inference'],
        'b200': ['Ultra-Large Foundation Training', 'High-Concurrency FP4 Serving'],
        'h100-sxm5': ['Large Foundation Model Training', 'Full Fine-Tuning (70B+)'],
        'h800': ['Enterprise LLM Pre-training', 'High-Throughput Clusters'],
        'h20': ['Massive Memory LLM Serving', 'Long Context Retrieval'],
        'a100-sxm4': ['LLM Fine-Tuning', 'Scientific Research'],
        'a800': ['Foundation Model Tuning', 'Scientific Computing'],
        'rtx-pro-6000': ['96GB Full Fine-Tuning', '70B+ Local Serving'],
        'rtx-5090': ['Flux.1 & 4K GenAI', '32GB Full Fine-Tuning'],
        'rtx-5080': ['High-Efficiency Diffusion', 'Lightweight LLM Serving'],
        'rtx-5070-ti': ['Academic Benchmarks', 'Diffusion Creation'],
        'rtx-5070': ['Introductory Deep Learning', 'Fast Model Prototyping'],
        'rtx-5060-ti': ['Budget 16G Learning', 'Personal Fine-Tuning'],
        'rtx-4090': ['Stable Diffusion & ComfyUI', 'LoRA Fine-Tuning'],
        'rtx-4080': ['ComfyUI Workflows', 'LoRA & QLoRA Tuning'],
        'rtx-4070-ti': ['Diffusion Prototyping', 'Lightweight Training'],
        'rtx-4060-ti': ['Affordable 16GB Inference', 'Personal AI Projects'],
        'rtx-3090': ['Budget Fine-Tuning', 'Academic Experiments'],
        'rtx-3080-ti': ['Mid-Scale Deep Learning', 'Image Generation'],
        'rtx-3060': ['Student Research', 'Entry Prototyping'],
        'rtx-2080-ti': ['Budget High-VRAM Training', 'Academic Experiments'],
        'l40s': ['High-Concurrency Inference', '3D & Video Synthesis'],
        'rtx-6000-ada': ['48GB Large Model Serving', 'Professional Workflows'],
        'rtx-a6000': ['Workstation Fine-Tuning', 'Large Diffusion Pipelines'],
        'a40': ['48GB High-VRAM Inference', 'Multi-task AI Serving'],
        'rtx-a5000': ['Professional Workstations', '24GB Multi-GPU Clusters'],
        'a10': ['Cloud Gaming & Inference', 'Cost-Effective AI Serving'],
        'v100-32g': ['32GB Classic Deep Learning', 'FP16 Model Training'],
        'v100-16g': ['Standard FP16 Training', 'Academic Benchmarking'],
        'tesla-t10': ['Budget 16GB Inference', 'Quantized LLM Serving'],
        'tesla-t4': ['High-Efficiency Inference', 'Lightweight Vision Serving'],
      },
    },
    pricing: {
      titleDynamic: 'Interactive',
      titleEstimator: 'Cost Calculator',
      subtitle:
        'Fractional hourly billing with tiered volume and duration discounts with mutual contract protection.',
      selectGpu: 'Select GPU Model',
      gpuInstances: 'GPU Instances',
      gpusUnit: 'GPUs',
      duration: 'Rental Duration',
      hoursUnit: 'Hours',
      billingTier: 'Billing Tier',
      onDemandGuaranteed: 'On-Demand (Guaranteed)',
      spotDiscount: 'Spot Instance (Save up to 45%)',
      summary: 'Cost Summary',
      baseRate: 'Base Rate',
      effectiveHourly: 'Effective Hourly Rate',
      volumeDiscount: 'Volume Discount',
      durationDiscount: 'Duration Discount',
      estimatedTotal: 'Estimated Total',
      savingsVsCloud: 'Savings vs Cloud',
      launchWithConfig: 'Launch with This Config',
      disclaimer: '※ Estimated prices are for demonstration (Currency: RMB ¥). Actual rental rates are determined by active node hosts in the console.',
      currencySymbol: '¥',
    },
    advantages: {
      titleEngineered: 'Engineered for Scale',
      titleAdvantages: 'Core Platform Advantages',
      subtitle:
        'Built on standardized Docker containers for instant deployment, eliminating cloud complexity.',
      quickConnect: 'Direct Terminal Quick Connect',
      quickConnectSub:
        'Once your container is provisioned, connect directly over secure port forwarding with zero VPN setup:',
      copied: 'Copied to clipboard!',
      copy: 'Copy',
      pillars: {
        'instant-boot': {
          title: 'Instant Container Spin-up',
          spec: 'Instant on pre-cached nodes',
          description: 'Pre-cached OCI container images boot with direct SSH terminal access in seconds without download waits.',
        },
        'root-ssh': {
          title: 'Direct Root SSH Access',
          spec: 'Port forwarding & key-based auth',
          description: 'Direct root terminal access with custom SSH public key injection and dedicated port forwarding.',
        },
        'pay-per-minute': {
          title: 'Granular Billing & Breach Protection',
          spec: 'Mutual cancellation protection',
          description: 'Precise runtime metering with contractual reservation terms; mutual cancellation penalties safeguard both host revenue and renter uptime.',
        },
        'turnkey-env': {
          title: 'Turnkey AI Containers',
          spec: 'Host-cached image instant start',
          description: 'Supports standard PyTorch, CUDA, and vLLM stacks. Instant startup is available whenever the host owner has pre-downloaded the selected image.',
        },
        'bare-metal': {
          title: 'Docker GPU Passthrough',
          spec: 'NVIDIA Container Toolkit (Docker)',
          description: 'Direct GPU passthrough within lightweight Docker containers, offering near-native compute performance with instant provisioning.',
        },
        'encrypted-storage': {
          title: 'High-Speed NVMe Storage',
          spec: 'Persistent volume mounts',
          description: 'Encrypted persistent NVMe volume mounts that retain model weights and training datasets across container restarts.',
        },
      },
    },
    useCases: {
      titlePurpose: 'Purpose-Built for',
      titleWorkloads: 'Modern AI Workloads',
      subtitle:
        'From fast local research to production-grade distributed inference pipelines.',
      recommended: 'Recommended Fleet',
      cases: {
        'llm-fine-tuning': {
          name: 'LLM Fine-Tuning & Pre-training',
          description: 'Multi-GPU clusters for 7B to 70B+ parameter model training, full fine-tuning, and LoRA/QLoRA adaptation.',
        },
        'generative-diffusion': {
          name: 'Generative Media & Video Synthesis',
          description: 'High-speed image generation and video synthesis workflows with dedicated GDDR6X VRAM and TensorRT acceleration.',
        },
        'academic-research': {
          name: 'Academic & Scientific Deep Learning',
          description: 'Cost-effective interactive Jupyter environments for paper replication, thesis benchmarking, and prototype experimentation.',
        },
        'production-inference': {
          name: 'High-Throughput Production Inference',
          description: 'Low-latency, high-concurrency LLM serving with continuous batching, paged attention, and FP8 quantization.',
        },
      },
    },
    faq: {
      titleFaq: 'Frequently Asked',
      titleQuestions: 'Questions',
      subtitle:
        'Everything you need to know about billing, SSH access, data persistence, and security.',
      items: {
        billing: {
          q: 'How does hourly and fractional billing work?',
          a: 'Billing is calculated per minute based on actual active container runtime with zero minimum commitment.',
          category: 'Billing',
        },
        ssh: {
          q: 'How do I connect to my GPU instance via SSH?',
          a: 'Every instance provides a direct root SSH command and optional web terminal link immediately after boot.',
          category: 'Connectivity',
        },
        storage: {
          q: 'Is my data persistent across instance restarts?',
          a: 'Yes, data stored in attached persistent NVMe volumes remains intact even when instances are paused or terminated.',
          category: 'Storage',
        },
        models: {
          q: 'What GPU models are offered and how do I choose for my workload?',
          a: 'We offer consumer GPUs (RTX 5090/5080/4090/3090/PRO 6000) for GenAI & fine-tuning, and enterprise nodes (B300/B200/H100/A100) for large distributed training.',
          category: 'Hardware',
        },
        security: {
          q: 'How is tenant isolation and security guaranteed?',
          a: 'Each container runs in a secure isolated Docker environment with dedicated GPU passthrough and encrypted storage.',
          category: 'Security',
        },
      },
    },
    footer: {
      tagline:
        'Next-generation on-demand GPU cloud infrastructure. Apple-grade design, Docker container isolation, per-minute billing, and zero-leak isolation.',
      colPlatform: 'Platform',
      colResources: 'Resources',
      colSecurity: 'Security & Trust',
      zeroLeak: 'Zero-Leak Architecture',
      ghPages: 'GitHub Pages Hosted',
      rights: 'All rights reserved.',
      contactUs: 'Contact Us (support@nextx.cc)',
      navCatalog: 'GPU Catalog',
      navPricing: 'Pricing Estimator',
      navAdvantages: 'Advantages',
      navUseCases: 'Use Cases',
      navFaq: 'FAQ',
      navDocs: 'Documentation',
      navStatus: 'System Status',
    },
    contactModal: {
      title: 'Contact Us',
      subtitle: 'Reach out for GPU rentals, custom clusters, enterprise SLAs, or becoming a compute host.',
      emailLabel: 'Official Support Email',
      copyBtn: 'Copy Email',
      copiedBtn: 'Copied to Clipboard!',
      sendEmailBtn: 'Send Email via Mail App',
      closeBtn: 'Close',
      slaNotice: 'We typically respond within 2 business hours.',
    },
  },
};
