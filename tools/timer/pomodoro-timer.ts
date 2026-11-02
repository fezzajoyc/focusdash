import { PomodoroEngine } from "../_engines/engine-pomodoro";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pomodoro-timer",
  category: "utility",
  icon: "clock",
  featured: true,
  engine: { component: PomodoroEngine },
  related: ["flowtime", "stopwatch-laps", "countdown-multi"],
  copy: {
    en: {
      name: "Pomodoro Timer",
      h1: "Pomodoro Timer — 25/5 focus cycles in your browser",
      tagline:
        "A classic Pomodoro timer with adjustable focus, short-break, long-break and interval settings — it chimes at every transition and keeps exact time across tab switches.",
      intro: [
        "The Pomodoro technique is the simplest working rhythm that survives contact with a real day: focus for 25 minutes, break for 5, and after four rounds take a longer 15-minute reset. This timer runs the whole schedule for you — it rings when a focus block ends and when a break is over, so you never have to watch the clock to stay on plan.",
        "Every duration is yours to change: shorter 15-minute sprints for a crowded morning, deep 50/10 cycles for hard problems, or more intervals before the long break. The countdown is anchored to your system clock rather than a ticking counter, so switching tabs, locking the screen or letting the laptop sleep never costs you a second.",
      ],
      steps: [
        "Adjust the four settings if the classic 25/5 ×4 with a 15-minute long break is not your rhythm.",
        "Press Start — the ring fills as the focus block runs, and a chime marks each transition.",
        "Keep the tab in the background if you like: the schedule advances on the clock, not on a ticker.",
        "When the last long break ends, the set is complete — reset and start the next round of sessions.",
      ],
      faqs: [
        {
          q: "Why exactly 25 and 5 minutes?",
          a: "Francesco Cirillo's original convention, kept because it works: 25 minutes is short enough that starting feels cheap and long enough to finish a meaningful chunk, while the 5-minute break resets attention without pulling you into something else. Treat them as defaults, not laws — the settings exist so you can find your own ratio.",
        },
        {
          q: "What happens if I switch tabs or my laptop sleeps?",
          a: "Nothing drifts. The timer stores a deadline computed from your device clock instead of counting ticks, so the remaining time shown when you come back is the true remaining time. A phase that ended while you were away chimes as soon as it notices.",
        },
        {
          q: "Do the chimes play if the tab is in the background?",
          a: "Usually yes — the sound is synthesized locally with the Web Audio API, and browsers allow it after you have interacted with the page (which pressing Start is). Muted tabs or certain strict browser modes can silence it, so for critical timing keep the tab audible.",
        },
        {
          q: "Is my data stored anywhere?",
          a: "No. The timer runs entirely in your browser and keeps no history, sends nothing, and has no account. When you reset or close the tab, the session is gone.",
        },
      ],
    },
    zh: {
      name: "番茄钟",
      h1: "番茄钟——25/5 专注循环,就在浏览器里",
      tagline:
        "经典番茄工作法计时器:专注、短休息、长休息与轮数全部可调,阶段切换自动响铃,切标签页、休眠都不掉秒。",
      intro: [
        "番茄工作法是最经得起真实日程考验的工作节奏:专注 25 分钟,休息 5 分钟,四轮之后来一次 15 分钟的长休息。这个计时器替你跑完整套流程——专注段结束和休息结束时都会响铃,你不用盯着表也能守住节奏。",
        "每个时长都可以改:早上日程杂乱,可以用 15 分钟短冲刺;啃硬骨头,可以换成 50/10 深度循环;长休息也可以推迟几轮。倒计时锚定系统时钟而不是滴答计数,切标签页、锁屏、笔记本休眠,回来时长依然分秒不差。",
      ],
      steps: [
        "如果经典的 25/5 ×4 + 15 分钟长休息不合你的节奏,先调整四项设置。",
        "按“开始”——圆环随专注段推进,每次阶段切换都会响铃提示。",
        "标签页可以一直放在后台:调度按系统时钟推进,不依赖前台心跳。",
        "最后一次长休息结束即整组完成,重置后开启下一轮。",
      ],
      faqs: [
        {
          q: "为什么正好是 25 分钟和 5 分钟?",
          a: "这是 Francesco Cirillo 的原始约定,保留它是因为好用:25 分钟短到“开始”毫无压力,又长得能完成一块像样的工作;5 分钟休息足以恢复注意力,又不至于让你岔去做别的事。把它们当默认值而不是铁律——设置项就是让你找到自己的配比。",
        },
        {
          q: "切标签页或电脑休眠会怎样?",
          a: "不会漂移。计时器存的是由设备时钟算出的截止时刻,不靠滴答累加,回来时显示的剩余时间就是真实剩余时间。你离开期间结束的阶段,回来后立刻响铃补上。",
        },
        {
          q: "标签页在后台时铃还会响吗?",
          a: "通常会。铃声由 Web Audio API 在本地合成,只要你与页面有过交互(按下“开始”就是),浏览器就允许播放。静音标签页或某些严格的浏览器模式可能让它无声,关键计时请保持标签页可发声。",
        },
        {
          q: "我的数据会被存储吗?",
          a: "不会。计时器完全在你的浏览器里运行,不保存历史、不发送任何数据、没有账号。重置或关闭标签页,本次记录就消失了。",
        },
      ],
    },
    ja: {
      name: "ポモドーロタイマー",
      h1: "ポモドーロタイマー——25/5 の集中サイクルをブラウザで",
      tagline:
        "定番ポモドーロ・テクニック用タイマー。集中・休憩・長休憩・セット数をすべて調整でき、切替時に通知音が鳴り、タブを切り替えても時間は正確です。",
      intro: [
        "ポモドーロ・テクニックは、現実のスケジュールに耐える最もシンプルな作業リズムです。25 分集中、5 分休憩、4 セット完了したら 15 分の長い休憩。このタイマーがそのスケジュール全体を運びます。集中ブロックの終わりと休憩の終わりに通知音が鳴るので、時計を見張らずに済みます。",
        "各時間は自由に変えられます。忙しい午前は 15 分の短いスプリント、難しい問題には 50/10 のディープサイクル、長休憩までのセット数を増やすのもあり。カウントダウンはティックの積み上げではなくシステム時計に固定されているため、タブ切り替え・画面ロック・スリープでも 1 秒も狂いません。",
      ],
      steps: [
        "定番の 25/5 ×4 + 15 分長休憩が合わなければ、まず 4 つの設定を調整します。",
        "スタートを押すとリングが集中ブロックとともに進み、切替ごとに通知音が鳴ります。",
        "タブはバックグラウンドのままで構いません。スケジュールはシステム時計で進みます。",
        "最後の長休憩が終わると 1 セット完了。リセットして次のラウンドへ。",
      ],
      faqs: [
        {
          q: "なぜ 25 分と 5 分なのですか?",
          a: "Francesco Cirillo の元の約束で、効くから残っています。25 分は「始める気」が起きるほど短く、まとまった仕事を片付けるには十分な長さ。5 分の休憩は注意をリセットしつつ、別の作業に流れるほどは長くありません。デフォルトとして使い、設定で自分の配分を見つけてください。",
        },
        {
          q: "タブを切り替えたり PC がスリープしたら?",
          a: "狂いません。タイマーはティックを数えるのではなく、デバイスの時計から計算した締切時刻を保持しています。戻ってきたときに表示される残り時間が、本当の残り時間です。不在中に終わったフェーズは、気づいた時点で通知音を鳴らします。",
        },
        {
          q: "バックグラウンドでも音は鳴りますか?",
          a: "通常は鳴ります。音は Web Audio API でローカル合成されており、ページを一度でも操作していれば(スタートを押すこと)再生が許可されます。ミュートしたタブや厳格なブラウザ設定では無音になることもあるため、重要な計時ではタブの音を有効にしてください。",
        },
        {
          q: "データはどこかに保存されますか?",
          a: "いいえ。タイマーは完全にブラウザ内で動き、履歴を保存せず、何も送信せず、アカウントもありません。リセットするかタブを閉じれば、セッションは消えます。",
        },
      ],
    },
    es: {
      name: "Temporizador Pomodoro",
      h1: "Temporizador Pomodoro — ciclos de 25/5 en su navegador",
      tagline:
        "Un temporizador Pomodoro clásico con enfoque, pausa corta, pausa larga e intervalos ajustables — suena en cada transición y no pierde un segundo aunque cambie de pestaña.",
      intro: [
        "La técnica Pomodoro es el ritmo de trabajo más simple que sobrevive a un día real: enfoque 25 minutos, pausa 5, y tras cuatro rondas un reinicio largo de 15. Este temporizador ejecuta la serie completa: suena cuando termina un bloque de enfoque y cuando acaba la pausa, así no tiene que vigilar el reloj para cumplir el plan.",
        "Cada duración es suya: sprints de 15 minutos para una mañana cargada, ciclos profundos de 50/10 para problemas duros, o más intervalos antes de la pausa larga. La cuenta atrás se ancla al reloj del sistema, no a un contador de ticacs: cambiar de pestaña, bloquear la pantalla o dejar dormir el portátil no cuesta ni un segundo.",
      ],
      steps: [
        "Ajuste las cuatro opciones si la serie clásica de 25/5 ×4 con pausa larga de 15 no es su ritmo.",
        "Pulse Iniciar — el anillo avanza con el bloque de enfoque y un aviso sonoro marca cada transición.",
        "Deje la pestaña en segundo plano si quiere: la serie avanza con el reloj, no con un ticac.",
        "Cuando termine la última pausa larga, la serie está completa — reinicie y emprenda la siguiente.",
      ],
      faqs: [
        {
          q: "¿Por qué exactamente 25 y 5 minutos?",
          a: "Es la convención original de Francesco Cirillo y se mantiene porque funciona: 25 minutos son pocos para que empezar dé pereza y suficientes para cerrar un trozo de trabajo decente; la pausa de 5 recupera la atención sin arrastrarle a otra cosa. Tómelos como valores por defecto, no como leyes — para eso están las opciones.",
        },
        {
          q: "¿Qué pasa si cambio de pestaña o el portátil se suspende?",
          a: "Nada se desvía. El temporizador guarda una hora límite calculada con el reloj del dispositivo en vez de contar ticacs, así que el tiempo restante que ve al volver es el real. Una fase que terminó mientras no miraba suena en cuanto se detecta.",
        },
        {
          q: "¿Suena el aviso con la pestaña en segundo plano?",
          a: "Normalmente sí — el sonido se sintetiza en local con la Web Audio API y el navegador lo permite tras interactuar con la página (pulsar Iniciar cuenta). Una pestaña silenciada o ciertos modos estrictos pueden callarlo; para tiempos críticos deje la pestaña con audio.",
        },
        {
          q: "¿Se guardan mis datos en algún sitio?",
          a: "No. El temporizador corre por completo en su navegador: no guarda historial, no envía nada y no tiene cuentas. Al reiniciar o cerrar la pestaña, la sesión desaparece.",
        },
      ],
    },
    pt: {
      name: "Timer Pomodoro",
      h1: "Timer Pomodoro — ciclos de 25/5 no seu navegador",
      tagline:
        "Um timer Pomodoro clássico com foco, pausa curta, pausa longa e intervalos ajustáveis — toca a cada transição e não perde um segundo mesmo trocando de aba.",
      intro: [
        "A técnica Pomodoro é o ritmo de trabalho mais simples que sobrevive a um dia real: foco de 25 minutos, pausa de 5 e, depois de quatro rodadas, um descanso longo de 15. Este timer conduz a série inteira — toca quando um bloco de foco termina e quando a pausa acaba, para você não precisar vigiar o relógio.",
        "Cada duração é sua para mudar: sprints de 15 minutos para uma manhã cheia, ciclos profundos de 50/10 para problemas difíceis, ou mais intervalos antes da pausa longa. A contagem fica ancorada no relógio do sistema, não num contador de tiques: trocar de aba, bloquear a tela ou deixar o notebook dormir não custa um segundo.",
      ],
      steps: [
        "Ajuste as quatro configurações se a série clássica de 25/5 ×4 com pausa longa de 15 não é o seu ritmo.",
        "Pressione Iniciar — o anel avança com o bloco de foco e um toque marca cada transição.",
        "Pode deixar a aba em segundo plano: a série avança pelo relógio, não por um marcador.",
        "Quando a última pausa longa terminar, a série está completa — zere e comece a próxima.",
      ],
      faqs: [
        {
          q: "Por que exatamente 25 e 5 minutos?",
          a: "É a convenção original de Francesco Cirillo, mantida porque funciona: 25 minutos são curtos o bastante para começar sem drama e longos o bastante para fechar uma fatia decente de trabalho, e a pausa de 5 recupera a atenção sem te arrastar para outra tarefa. Trate-os como padrões, não leis — as configurações existem para você achar sua própria proporção.",
        },
        {
          q: "E se eu trocar de aba ou o notebook dormir?",
          a: "Nada se atrasa. O timer guarda um prazo calculado pelo relógio do aparelho em vez de contar tiques, então o tempo restante mostrado quando você volta é o tempo restante real. Uma fase que terminou enquanto você estava fora toca assim que é percebida.",
        },
        {
          q: "O toque soa com a aba em segundo plano?",
          a: "Normalmente sim — o som é sintetizado localmente com a Web Audio API e o navegador permite depois de qualquer interação com a página (pressionar Iniciar já conta). Aba silenciada ou modos restritivos podem abafá-lo; para cronometragem crítica deixe a aba com áudio.",
        },
        {
          q: "Meus dados ficam guardados em algum lugar?",
          a: "Não. O timer roda inteiro no seu navegador: não guarda histórico, não envia nada e não tem conta. Ao zerar ou fechar a aba, a sessão desaparece.",
        },
      ],
    },
  },
});
