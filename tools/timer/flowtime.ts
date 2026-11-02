import { FlowtimeEngine } from "../_engines/engine-flowtime";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "flowtime",
  category: "utility",
  icon: "rotate",
  engine: { component: FlowtimeEngine },
  related: ["pomodoro-timer", "stopwatch-laps", "countdown-multi"],
  copy: {
    en: {
      name: "Flowtime Tracker",
      h1: "Flowtime — work in flow, rest on your terms",
      tagline:
        "The Flowtime technique without preset intervals: the timer counts up while you work, and when you reach a natural stopping point it suggests a break of one minute per five focused.",
      intro: [
        "Some days a 25-minute bell is exactly the interruption you did not need. Flowtime (or flowtime technique) flips the Pomodoro around: instead of fixed intervals, you start the timer, sink into the work, and stop only when you hit a natural break point — a chapter finished, a function shipped, a draft done. The timer just counts up and stays out of the way.",
        "The method keeps the part of Pomodoro that matters — the protected rest. When you stop, the tool divides your focus time by five and suggests that as a break: 25 minutes of work earns 5 minutes of rest, a 90-minute deep dive earns 18. Long sessions produce longer breaks, which is the quiet incentive to actually take them.",
      ],
      steps: [
        "Press Start when you begin working — no duration to configure, the clock simply runs up.",
        "Keep going until you reach a natural stopping point; the counter keeps exact time even in a background tab.",
        "Press Stop & rest: the suggested break appears — one minute for every five you focused.",
        "Take the suggested break (the countdown rings when it ends), then start your next round.",
      ],
      faqs: [
        {
          q: "How is Flowtime different from Pomodoro?",
          a: "Pomodoro fixes the rhythm from the outside: 25 minutes, a bell, a break whether you wanted one or not. Flowtime lets the task set the rhythm: you stop when the work reaches a natural boundary, then rest proportionally. People doing deep, stateful work — writing, debugging, design — tend to prefer Flowtime; people who need a forcing function to start tend to prefer Pomodoro.",
        },
        {
          q: "Why divide by five?",
          a: "It reproduces the classic 25/5 ratio (25 ÷ 5 = 5) and scales it honestly: 50 minutes of work suggests 10 minutes of rest, not the same old 5. The proportion is the point — the longer you focus, the more recovery your attention needs.",
        },
        {
          q: "Can I pause instead of stopping?",
          a: "Yes — pause freezes the counter for interruptions like a phone call, and resume continues the same session. Pause is for interruptions you did not choose; Stop & rest is for the stopping point you chose.",
        },
        {
          q: "Does the tool keep history of my sessions?",
          a: "Only for the current visit: it totals the completed rounds while the page stays open. Nothing is written to disk or sent anywhere — close the tab and the ledger starts clean next time.",
        },
      ],
    },
    zh: {
      name: "心流计时",
      h1: "Flowtime 心流计时——按自己的节奏工作与休息",
      tagline:
        "Flowtime 心流法:不预设番茄段,开始后一路向上计时;到了自然停点停下,工具按每专注 5 分钟休息 1 分钟给出建议。",
      intro: [
        "有些日子,25 分钟的铃声恰恰是你最不需要的打断。Flowtime 把番茄工作法倒了过来:不设固定间隔,按下开始、沉进工作,直到碰到一个自然的停点——一章读完、一个函数提交、一稿写完——才停。计时器只是安静地向上走,不打扰你。",
        "它保留了番茄法真正要紧的部分——受保护的休息。停下时,工具把专注时长除以五,得出建议休息:专注 25 分钟换 5 分钟休息,90 分钟的深潜换 18 分钟。专注越久,休息越长,这本身就是一种让你真正去休息的激励。",
      ],
      steps: [
        "开始工作时按下“开始专注”——没有时长要配,时钟自然向上走。",
        "一直做到遇到自然停点;即使标签页在后台,计时也分秒不差。",
        "按下“停下休息”:出现建议休息时长——每专注 5 分钟对应 1 分钟。",
        "按建议休息(倒数结束会响铃),然后开始下一轮。",
      ],
      faqs: [
        {
          q: "Flowtime 和番茄钟有什么不同?",
          a: "番茄钟从外部固定节奏:25 分钟、响铃、休息,不管你当时想不想。Flowtime 让任务自己定节奏:工作到达自然边界才停,休息按比例来。写作、调试、设计这类沉浸式深度工作的人多半偏爱 Flowtime;需要外力逼自己开始的人多半更适合番茄钟。",
        },
        {
          q: "为什么是除以五?",
          a: "它复现了经典的 25/5 比例(25 ÷ 5 = 5),并诚实地随时长缩放:专注 50 分钟建议休息 10 分钟,而不是一成不变的 5 分钟。比例才是重点——专注越久,注意力需要的恢复就越长。",
        },
        {
          q: "可以暂停吗?",
          a: "可以。暂停会冻结计数,适合接电话这类被动打断,回来继续算同一段。暂停留给你没选择的打断;“停下休息”留给你自己选择的停点。",
        },
        {
          q: "工具会保存我的记录吗?",
          a: "只保存在当前访问里:页面开着期间累计完成的轮数。不写盘、不上传——关掉标签页,下次从零开始。",
        },
      ],
    },
    ja: {
      name: "フロータイム",
      h1: "フロータイム——フローのまま働き、自分のタイミングで休む",
      tagline:
        "プリセット区間のないフロータイム・テクニック:開始すると時計は上がり続け、区切りのいいところで止めると、集中 5 分につき 1 分の休憩を提案します。",
      intro: [
        "25 分のベルが、いちばん要らない割り込みになる日があります。フロータイムはポモドーロをひっくり返した方法です。固定の区間を設けず、タイマーを開始して作業に沈み込み、自然な区切り——章が終わった、関数を出した、草稿が書けた——でだけ止めます。タイマーはただ上がり続けるだけで、邪魔をしません。",
        "この方法は、ポモドーロの本当に大事な部分——守られた休息——を残しています。止めた時点で、集中時間を 5 で割った値を休憩として提案します。25 分の作業は 5 分の休憩、90 分の深掘りは 18 分。長いセッションほど長い休憩になり、それ自体が休憩をちゃんと取るための静かな仕掛けです。",
      ],
      steps: [
        "作業を始めるときに「集中スタート」を押します。設定する時間はありません。",
        "自然な区切りが来るまでそのまま続けます。バックグラウンドのタブでも計時は正確です。",
        "「止めて休憩」を押すと、集中 5 分につき 1 分で休憩時間が提案されます。",
        "提案どおり休憩し(終了時に通知音が鳴ります)、次のラウンドへ。",
      ],
      faqs: [
        {
          q: "フロータイムとポモドーロの違いは?",
          a: "ポモドーロはリズムを外側が固定します。25 分でベル、休憩したくなくても休憩。フロータイムはタスクがリズムを決めます。仕事が自然な境界に達したら止め、休息は比例させます。執筆・デバッグ・デザインのような没入型の深い仕事にはフロータイム、始めるための外圧が必要な人にはポモドーロが合います。",
        },
        {
          q: "なぜ 5 で割るのですか?",
          a: "定番の 25/5 の比率(25 ÷ 5 = 5)を再現しつつ、長さに応じて正直に拡張するためです。50 分の作業には 10 分の休憩を提案し、いつもの 5 分のままにはしません。比率が本質です。集中が長いほど、注意の回復にも長さが要ります。",
        },
        {
          q: "止めずに一時停止できますか?",
          a: "できます。一時停止はカウンタを凍結するので、電話などの割り込みに使い、再開すれば同じセッションの続きです。一時停止は選ばなかった割り込みに、「止めて休憩」は自分で選んだ区切りに。",
        },
        {
          q: "セッションの記録は残りますか?",
          a: "現在のアクセスの間だけです。ページを開いている間、完了したラウンドの合計を出します。ディスクにも書かず、送信もせず、タブを閉じれば次はゼロからです。",
        },
      ],
    },
    es: {
      name: "Temporizador Flowtime",
      h1: "Flowtime — trabaje en flujo y descanse a su manera",
      tagline:
        "La técnica Flowtime sin intervalos prefijados: el reloj cuenta hacia arriba mientras trabaja y, al llegar a un punto natural de corte, sugiere un minuto de descanso por cada cinco de enfoque.",
      intro: [
        "Hay días en que el timbre de los 25 minutos es justo la interrupción que no necesitaba. Flowtime invierte el método Pomodoro: en vez de intervalos fijos, arranca el reloj, se hunde en el trabajo y solo se detiene al llegar a un corte natural — un capítulo terminado, una función enviada, un borrador listo. El reloj solo cuenta hacia arriba y no molesta.",
        "El método conserva lo que importa del Pomodoro — el descanso protegido. Al parar, la herramienta divide su tiempo de enfoque entre cinco y lo propone como pausa: 25 minutos de trabajo ganan 5 de descanso, una inmersión de 90 gana 18. Las sesiones largas producen pausas más largas, que es el incentivo silencioso para tomarlas de verdad.",
      ],
      steps: [
        "Pulse Iniciar cuando empiece a trabajar — nada que configurar, el reloj simplemente sube.",
        "Siga hasta llegar a un punto natural de parada; el contador mantiene la hora exacta incluso en segundo plano.",
        "Pulse Parar y descansar: aparece el descanso sugerido — un minuto por cada cinco enfocado.",
        "Tómese el descanso propuesto (la cuenta atrás avisa al terminar) y emprenda la siguiente ronda.",
      ],
      faqs: [
        {
          q: "¿En qué se diferencia Flowtime del Pomodoro?",
          a: "El Pomodoro fija el ritmo desde fuera: 25 minutos, un timbre y una pausa la quieras o no. Flowtime deja que la tarea marque el ritmo: usted para cuando el trabajo alcanza un borde natural y descansa en proporción. Quien hace trabajo profundo y con estado — escribir, depurar, diseñar — suele preferir Flowtime; quien necesita un detonante para empezar, el Pomodoro.",
        },
        {
          q: "¿Por qué dividir entre cinco?",
          a: "Reproduce la proporción clásica 25/5 (25 ÷ 5 = 5) y la escala con honestidad: 50 minutos de trabajo sugieren 10 de descanso, no los mismos 5 de siempre. La proporción es lo que cuenta — cuánto más enfoca, más recuperación necesita su atención.",
        },
        {
          q: "¿Puedo pausar en vez de parar?",
          a: "Sí — pausar congela el contador para interrupciones como una llamada, y continuar retoma la misma sesión. La pausa es para interrupciones que no eligió; Parar y descansar, para el punto de corte que usted eligió.",
        },
        {
          q: "¿La herramienta guarda el historial de mis sesiones?",
          a: "Solo de la visita actual: totaliza las rondas completadas mientras la página siga abierta. No escribe nada en disco ni envía nada — cierre la pestaña y la contabilidad empieza limpia la próxima vez.",
        },
      ],
    },
    pt: {
      name: "Timer Flowtime",
      h1: "Flowtime — trabalhe em fluxo e descanse do seu jeito",
      tagline:
        "A técnica Flowtime sem intervalos predefinidos: o relógio conta para cima enquanto você trabalha e, num ponto natural de parada, sugere um minuto de pausa a cada cinco de foco.",
      intro: [
        "Há dias em que a campainha dos 25 minutos é exatamente a interrupção de que você não precisava. O Flowtime inverte o Pomodoro: em vez de intervalos fixos, você inicia o relógio, mergulha no trabalho e só para quando chega a um ponto de parada natural — um capítulo terminado, uma função entregue, um rascunho pronto. O relógio só conta para cima e não atrapalha.",
        "O método preserva o que importa no Pomodoro — a pausa protegida. Quando você para, a ferramenta divide o tempo de foco por cinco e sugere isso como descanso: 25 minutos de trabalho rendem 5 de pausa, uma imersão de 90 rende 18. Sessões longas geram pausas mais longas — esse é o incentivo silencioso para realmente tomá-las.",
      ],
      steps: [
        "Pressione Iniciar ao começar a trabalhar — nada para configurar, o relógio simplesmente sobe.",
        "Continue até chegar a um ponto natural de parada; o contador mantém a hora exata mesmo em segundo plano.",
        "Pressione Parar e descansar: aparece a pausa sugerida — um minuto a cada cinco de foco.",
        "Tome a pausa sugerida (a contagem toca ao terminar) e comece a próxima rodada.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre Flowtime e Pomodoro?",
          a: "O Pomodoro fixa o ritmo de fora: 25 minutos, uma campainha, uma pausa você queira ou não. O Flowtime deixa a tarefa ditar o ritmo: você para quando o trabalho chega a um limite natural e descansa em proporção. Quem faz trabalho profundo e cheio de estado — escrever, depurar, desenhar — tende a preferir Flowtime; quem precisa de um gatilho para começar, tende a preferir o Pomodoro.",
        },
        {
          q: "Por que dividir por cinco?",
          a: "Reproduz a proporção clássica 25/5 (25 ÷ 5 = 5) e escala com honestidade: 50 minutos de trabalho sugerem 10 de pausa, não os mesmos 5 de sempre. A proporção é o que importa — quanto mais tempo de foco, mais recuperação a sua atenção precisa.",
        },
        {
          q: "Posso pausar em vez de parar?",
          a: "Sim — pausar congela o contador para interrupções como uma ligação, e retomar continua a mesma sessão. A pausa é para interrupções que você não escolheu; Parar e descansar é para o ponto de parada que você escolheu.",
        },
        {
          q: "A ferramenta guarda histórico das minhas sessões?",
          a: "Só da visita atual: ela totaliza as rodadas concluídas enquanto a página segue aberta. Nada é gravado em disco nem enviado — feche a aba e o saldo começa limpo na próxima vez.",
        },
      ],
    },
  },
});
