import { CountdownMultiEngine } from "../_engines/engine-countdown";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "countdown-multi",
  category: "utility",
  icon: "layers",
  engine: { component: CountdownMultiEngine },
  related: ["pomodoro-timer", "flowtime", "stopwatch-laps"],
  copy: {
    en: {
      name: "Multi Countdown Timer",
      h1: "Multiple Countdown Timers at Once",
      tagline:
        "Run several named countdowns side by side — tea at 3:00, a code review at 15:00 — each on its own clock, sorted by time left, with a chime and a flash at zero.",
      intro: [
        "One timer is never enough on a busy afternoon: the tea is steeping, the code review ends in fifteen minutes, and the laundry has nine left. This tool runs any number of named countdowns at the same time, each anchored to its own deadline on your system clock. Start, pause, reset and delete them independently; the list always stays sorted by the time remaining.",
        "Each countdown keeps its own state, so pausing one never touches the others. When a countdown reaches zero it chimes once and flashes until you reset or delete it — you cannot miss it, but it will not nag you with repeating alarms.",
      ],
      steps: [
        "Type a name and set the duration with hours, minutes and seconds, then press Add countdown.",
        "Press Start on each timer you want running — they all count down in parallel.",
        "Pause any timer for an interruption and resume it later; the remaining time is preserved exactly.",
        "At zero the timer chimes and flashes; reset it to reuse the duration or delete it when done.",
      ],
      faqs: [
        {
          q: "How many countdowns can run at once?",
          a: "As many as you find useful — each one is a few hundred bytes of state and a deadline, so even dozens run without a hitch. They are only shown as long as the page is open; nothing is stored between visits.",
        },
        {
          q: "Will they stay accurate if the tab is in the background?",
          a: "Yes. Every countdown stores a deadline computed from the device clock, not a count of seconds ticked. Browsers throttle background tabs, but the remaining time shown when you return is always the true remaining time.",
        },
        {
          q: "What happens at zero?",
          a: "The countdown plays a short chime once, then keeps flashing in red until you press Reset (to reuse the same duration) or Delete. There are no repeating alarms — one honest signal, then the flashing takes over silently.",
        },
        {
          q: "Can I use it as a kitchen timer?",
          a: "Absolutely — that is the classic use: one named countdown per pot. Name them (“Eggs 6:00”, “Rice 15:00”), start them together and the list sorts itself so the one closest to zero is always on top.",
        },
      ],
    },
    zh: {
      name: "多路倒计时",
      h1: "多个倒计时同时运行",
      tagline:
        "并排运行多个命名倒计时——泡茶 3:00、代码评审 15:00——各自独立计时,按剩余时间排序,归零时响铃并闪烁提醒。",
      intro: [
        "忙碌的下午一个计时器永远不够:茶在泡,代码评审还剩十五分钟,洗衣机还剩九分钟。这个工具同时运行任意多个命名倒计时,每个都锚定自己基于系统时钟的截止时刻。独立地开始、暂停、复位、删除;列表始终按剩余时间排序。",
        "每个倒计时保持自己的状态,暂停一个绝不影响其他。归零时响一声铃并持续闪烁,直到你复位或删除——不会错过,但也不会用重复闹铃烦你。",
      ],
      steps: [
        "输入名称,按时、分、秒设置时长,然后按“添加倒计时”。",
        "对要跑的每个计时器按“开始”——它们并行倒数,互不干扰。",
        "被打断时暂停任意计时器,稍后继续;剩余时间分毫不差地保留。",
        "归零后响铃并闪烁;按“复位”重用同一时长,或按“删除”结束。",
      ],
      faqs: [
        {
          q: "同时能跑多少个倒计时?",
          a: "多少个都行——每个只是一小段状态和一个截止时刻,几十个也毫无压力。它们只在页面打开期间存在,访问之间不存储任何东西。",
        },
        {
          q: "标签页在后台还会准吗?",
          a: "会。每个倒计时存的都是由设备时钟算出的截止时刻,不是数过的秒数。浏览器会节流后台标签页,但你回来时看到的剩余时间永远是真实剩余时间。",
        },
        {
          q: "归零时会发生什么?",
          a: "响一声短铃,然后持续红色闪烁,直到你按“复位”(重用同一时长)或“删除”。没有重复闹铃——一声诚实的信号,之后交给安静的闪烁。",
        },
        {
          q: "能当厨房计时器用吗?",
          a: "完全可以——这正是经典用法:一锅一个命名倒计时。命名(“鸡蛋 6:00”、“米饭 15:00”),一起开始,列表会自动排序,最接近零的永远在最上面。",
        },
      ],
    },
    ja: {
      name: "複数カウントダウン",
      h1: "複数のカウントダウンを同時に",
      tagline:
        "名前付きカウントダウンをいくつも並行実行——お茶 3:00、コードレビュー 15:00。それぞれ独立した時計で動き、残り時間順に並び、ゼロで音と点滅でお知らせします。",
      intro: [
        "忙しい午後、タイマーは 1 では足りません。お茶が浸かっていて、コードレビューは 15 分後に終わり、洗濯機は残り 9 分。このツールは名前付きカウントダウンをいくつでも同時に走らせ、それぞれがシステム時計に基づく自分の締切に固定されます。開始・一時停止・リセット・削除は独立。リストは常に残り時間の短い順に並びます。",
        "各カウントダウンは自分の状態だけを保つので、1 つの一時停止がほかに触れることはありません。ゼロになると一度だけ音が鳴り、リセットか削除するまで点滅します——見逃せないのに、繰り返すアラームで煩わしくもない。",
      ],
      steps: [
        "名前を入力し、時・分・秒で時間を設定して「カウントダウンを追加」を押します。",
        "走らせたいタイマーごとに「スタート」を押すと、並行してカウントダウンします。",
        "割り込み時は任意のタイマーを一時停止し、あとで再開。残り時間は正確に保たれます。",
        "ゼロで音が鳴り点滅します。「リセット」で同じ時間を再利用、「削除」で終了。",
      ],
      faqs: [
        {
          q: "同時にいくつ走らせられますか?",
          a: "実用上いくつでも。1 あたり数百バイトの状態と締切時刻だけで、数十個でも軽々です。ページを開いている間だけ存在し、訪問の間には何も保存しません。",
        },
        {
          q: "バックグラウンドでも正確ですか?",
          a: "はい。各カウントダウンは秒を数えるのではなく、デバイスの時計から計算した締切を保持します。ブラウザはバックグラウンドのタブを絞りますが、戻ったときに表示される残り時間は常に本当の残り時間です。",
        },
        {
          q: "ゼロになったら何が起きますか?",
          a: "短い音を一度だけ鳴らし、その後は赤く点滅が続きます。「リセット」(同じ時間を再利用)か「削除」を押すまで。繰り返すアラームはなく、一度の正直な合図のあとは静かな点滅に引き継がれます。",
        },
        {
          q: "キッチンタイマーとして使えますか?",
          a: "もちろん——それが定番の使い方です。鍋ごとに名前付きカウントダウンを(「卵 6:00」「ご飯 15:00」)、まとめてスタート。リストは自動で並び替わり、ゼロに最も近いものが常に一番上に。",
        },
      ],
    },
    es: {
      name: "Cuenta atrás múltiple",
      h1: "Varias cuentas atrás a la vez",
      tagline:
        "Ejecute varias cuentas atrás con nombre a la par — el té a las 3:00, la revisión de código a las 15:00 — cada una con su propio reloj, ordenadas por tiempo restante, con un aviso sonoro y un destello al llegar a cero.",
      intro: [
        "Una tarde ocupada nunca se conforma con un temporizador: el té se está haciendo, la revisión de código termina en quince minutos y la lavadora tiene nueve. Esta herramienta ejecuta cualquier número de cuentas atrás con nombre al mismo tiempo, cada una anclada a su propia hora límite según el reloj del sistema. Inícielas, páuselas, reinícieles y bórrelas de forma independiente; la lista siempre queda ordenada por el tiempo restante.",
        "Cada cuenta atrás conserva su propio estado, así que pausar una jamás toca a las demás. Al llegar a cero suena una vez y destella hasta que la reinicie o la borre — imposible de pasar por alto, sin acoso de alarmas repetidas.",
      ],
      steps: [
        "Escriba un nombre y fije la duración con horas, minutos y segundos, y pulse Añadir cuenta atrás.",
        "Pulse Iniciar en cada temporizador que quiera en marcha — todos cuentan en paralelo.",
        "Pause cualquier temporizador ante una interrupción y retómelo después; el tiempo restante se conserva exacto.",
        "Al llegar a cero suena y destella; reiníciela para reutilizar la duración o bórrela al terminar.",
      ],
      faqs: [
        {
          q: "¿Cuántas cuentas atrás pueden correr a la vez?",
          a: "Las que le resulten útiles — cada una son unos cientos de bytes de estado y una hora límite, así que incluso docenas van sin despeinarse. Solo existen mientras la página está abierta; entre visitas no se guarda nada.",
        },
        {
          q: "¿Siguen exactas con la pestaña en segundo plano?",
          a: "Sí. Cada cuenta atrás guarda una hora límite calculada con el reloj del dispositivo, no un recuento de segundos. Los navegadores ralentizan las pestañas de fondo, pero el tiempo restante que ve al volver siempre es el verdadero.",
        },
        {
          q: "¿Qué pasa al llegar a cero?",
          a: "Suena un aviso corto una vez y después queda destellando en rojo hasta que pulse Reiniciar (para reutilizar la duración) o Eliminar. No hay alarmas repetidas — una sola señal honesta y el destello silencioso toma el relevo.",
        },
        {
          q: "¿Sirve como temporizador de cocina?",
          a: "Por supuesto — es el uso clásico: una cuenta atrás con nombre por cada olla. Nómbralas («Huevos 6:00», «Arroz 15:00»), arráncalas juntas y la lista se ordena sola: la más cercana a cero siempre arriba.",
        },
      ],
    },
    pt: {
      name: "Contagem regressiva múltipla",
      h1: "Várias contagens regressivas ao mesmo tempo",
      tagline:
        "Rode várias contagens regressivas com nome lado a lado — chá às 3:00, revisão de código às 15:00 — cada uma no próprio relógio, ordenadas pelo tempo restante, com toque e piscada no zero.",
      intro: [
        "Uma tarde cheia nunca se contenta com um timer só: o chá está em infusão, a revisão de código termina em quinze minutos e a máquina de lavar tem nove. Esta ferramenta roda quantas contagens regressivas nomeadas você quiser ao mesmo tempo, cada uma ancorada ao próprio prazo pelo relógio do sistema. Inicie, pause, zere e exclua de forma independente; a lista fica sempre ordenada pelo tempo restante.",
        "Cada contagem mantém o próprio estado, então pausar uma nunca mexe com as outras. Ao chegar a zero ela toca uma vez e pisca até você zerar ou excluir — impossível não notar, sem insistência de alarmes repetidos.",
      ],
      steps: [
        "Digite um nome e defina a duração em horas, minutos e segundos, depois pressione Adicionar contagem.",
        "Pressione Iniciar em cada timer que quiser rodando — todos contam em paralelo.",
        "Pause qualquer timer numa interrupção e retome depois; o tempo restante é preservado exato.",
        "No zero, o timer toca e pisca; zere para reutilizar a duração ou exclua ao terminar.",
      ],
      faqs: [
        {
          q: "Quantas contagens podem rodar ao mesmo tempo?",
          a: "Quantas forem úteis — cada uma é alguns centenas de bytes de estado e um prazo, então até dezenas correm sem esforço. Elas existem só enquanto a página está aberta; entre visitas nada é guardado.",
        },
        {
          q: "Ficam exatas com a aba em segundo plano?",
          a: "Sim. Cada contagem guarda um prazo calculado pelo relógio do aparelho, não uma contagem de segundos. Os navegadores limitam abas de fundo, mas o tempo restante mostrado quando você volta é sempre o verdadeiro.",
        },
        {
          q: "O que acontece no zero?",
          a: "Um toque curto soa uma vez e depois fica piscando em vermelho até você pressionar Zerar (para reutilizar a duração) ou Excluir. Não há alarmes repetidos — um sinal honesto e a piscada silenciosa assume.",
        },
        {
          q: "Dá para usar como timer de cozinha?",
          a: "Com certeza — esse é o uso clássico: uma contagem nomeada por panela. Nomeie («Ovos 6:00», «Arroz 15:00»), inicie todas juntas e a lista se ordena sozinha: a mais próxima do zero fica sempre no topo.",
        },
      ],
    },
  },
});
