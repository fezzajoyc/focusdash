import { StopwatchEngine } from "../_engines/engine-stopwatch";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "stopwatch-laps",
  category: "utility",
  icon: "ruler",
  engine: { component: StopwatchEngine },
  related: ["pomodoro-timer", "flowtime", "countdown-multi"],
  copy: {
    en: {
      name: "Stopwatch with Laps",
      h1: "Online Stopwatch with Lap Times",
      tagline:
        "A precision stopwatch that records lap splits and cumulative totals, keeps exact time across background tabs and exports every lap as a CSV file.",
      intro: [
        "A lap timer is only useful if its numbers are trustworthy. This stopwatch measures with your device's system clock instead of counting timer ticks, which is why a lap recorded after twenty minutes in another tab is still accurate to the hundredth of a second. Start, pause, take as many laps as you need, and read both the per-lap split and the running total in the table.",
        "The lap table is the point: split times show the shape of your effort — where you sped up, where you faded — while the total column anchors each lap in the whole. When you are done, one click exports everything as CSV (lap, split, total) that opens directly in a spreadsheet.",
      ],
      steps: [
        "Press Start — the display shows minutes and seconds with hundredth-of-a-second precision.",
        "Press Lap at each moment you want recorded; the last row always shows on top.",
        "Pause and resume freely; the accumulated time is preserved exactly.",
        "Press Export CSV to download the lap table as lap,split,total — ready for your spreadsheet.",
      ],
      faqs: [
        {
          q: "How accurate is it, really?",
          a: "The measurement is anchored to Date.now(), so the elapsed time is correct regardless of tab throttling or device sleep — the pause in rendering never becomes an error in the number. The display refreshes about thirty times a second, so what you see is the hundredth-of-a-second truth.",
        },
        {
          q: "What is the difference between split and total?",
          a: "The split is the time for that lap alone — how long since the previous lap press. The total is the running time since the very first Start. Runners usually care about splits; experimenters usually care about totals, and the table gives you both.",
        },
        {
          q: "What does the CSV contain?",
          a: "A header row (lap, split, total) and one row per lap, with times formatted as M:SS.cc — for example 2,0:41.57,1:03.12. It downloads as focusdash-laps.csv and opens in Excel, Google Sheets or any text editor.",
        },
        {
          q: "Does it keep running if I close the tab?",
          a: "No — closing the tab ends the measurement, and nothing is stored or transmitted. The stopwatch is deliberately stateless: your timings live in the exported CSV, not on a server.",
        },
      ],
    },
    zh: {
      name: "秒表(计段)",
      h1: "在线秒表——支持分段计时",
      tagline:
        "高精度在线秒表:记录每段用时与累计时间,后台标签页、设备休眠都不影响精度,还可把全部计段导出为 CSV 文件。",
      intro: [
        "秒表只有在数字可信时才有用。这款秒表用设备系统时钟测量,而不是数定时器滴答——所以你在别的标签页待了二十分钟后按下的计段,依然精确到百分之一秒。启动、暂停、随意计段,表里同时给出每段用时和累计时间。",
        "分段表才是重点:分段用时展示你发力的形状——哪里提速了、哪里掉速了——累计列则把每一段放进整体里看。结束后一键导出 CSV(lap、split、total),表格软件直接打开。",
      ],
      steps: [
        "按“启动”——显示精确到百分之一秒的分:秒。",
        "在想记录的时刻按“计段”;最新一段始终显示在最上面。",
        "随时暂停、继续;累计时间分毫不差地保留。",
        "按“导出 CSV”下载计段表(lap,split,total),直接用表格软件打开。",
      ],
      faqs: [
        {
          q: "精度到底有多高?",
          a: "测量锚定 Date.now(),无论标签页被节流还是设备休眠,经过的时间都是对的——渲染的暂停不会变成数字的误差。显示每秒刷新约三十次,你看到的就是百分之一秒级的真实读数。",
        },
        {
          q: "“分段”和“累计”有什么区别?",
          a: "分段是这一段自己的用时——距上一次计段过了多久;累计是从最初“启动”到现在的总时间。跑步的人通常看分段,做实验的人通常看累计,表里两个都有。",
        },
        {
          q: "CSV 里有什么?",
          a: "一行表头(lap,split,total)加每段一行,时间格式为 M:SS.cc——例如 2,0:41.57,1:03.12。下载文件名为 focusdash-laps.csv,Excel、Google Sheets 或任意文本编辑器都能打开。",
        },
        {
          q: "关掉标签页还会继续计时吗?",
          a: "不会——关闭标签页测量即结束,任何数据都不存储、不上传。这款秒表刻意做成无状态:你的计时结果活在导出的 CSV 里,不在服务器上。",
        },
      ],
    },
    ja: {
      name: "ストップウォッチ(ラップ付き)",
      h1: "ラップ計測できるオンラインストップウォッチ",
      tagline:
        "ラップごとの区間タイムと累計を記録する高精度ストップウォッチ。バックグラウンドのタブやスリープでも狂わず、全ラップを CSV で書き出せます。",
      intro: [
        "ラップタイマーは数字が信頼できてこそ役に立ちます。このストップウォッチはタイマーのティックを数えるのではなく、デバイスのシステム時計で測ります。別のタブに 20 分いたあとに押したラップでも、100 分の一秒単位で正確。スタート・一時停止・ラップは取り放題で、表には各区間タイムと累計の両方が出ます。",
        "ポイントはラップ表です。区間タイムは頑張りの形——どこで加速し、どこで失速したか——を見せ、累計列が各ラップを全体の中に置きます。終わったらワンクリックで CSV(lap、split、total)に書き出し、表計算ソフトですぐ開けます。",
      ],
      steps: [
        "スタートを押すと、100 分の一秒精度の「分:秒」で表示されます。",
        "記録したい瞬間に「ラップ」を押します。最新の行が常にいちばん上に出ます。",
        "一時停止と再開は自由。累計時間は正確に保たれます。",
        "「CSV を書き出す」で lap,split,total 形式のラップ表をダウンロード、すぐ表計算に入れられます。",
      ],
      faqs: [
        {
          q: "精度は実際どのくらいですか?",
          a: "計測は Date.now() に固定されているため、タブのスロットリングやスリープがあっても経過時間は正確です。描画が止まっていた時間が数値の誤差になることはありません。表示は毎秒約 30 回更新されるので、見えているのが 100 分の一秒の実値です。",
        },
        {
          q: "「区間」と「累計」の違いは?",
          a: "区間はそのラップだけの時間——前回のラップ押下からどれだけ経ったか。累計は最初のスタートからの総時間。ランナーは区間、実験者は累計を見がちですが、表には両方あります。",
        },
        {
          q: "CSV には何が入りますか?",
          a: "ヘッダー行(lap, split, total)と各ラップ 1 行で、時刻は M:SS.cc 形式——たとえば 2,0:41.57,1:03.12。focusdash-laps.csv という名前でダウンロードでき、Excel・Google Sheets・テキストエディタのどこでも開けます。",
        },
        {
          q: "タブを閉じても計測は続きますか?",
          a: "いいえ——タブを閉じると計測は終了し、何も保存・送信されません。このストップウォッチは意図的にステートレスです。計時結果は書き出した CSV の中にだけあります。",
        },
      ],
    },
    es: {
      name: "Cronómetro con vueltas",
      h1: "Cronómetro online con tiempos por vuelta",
      tagline:
        "Un cronómetro de precisión que registra parciales por vuelta y totales acumulados, no pierde la hora en pestañas de fondo y exporta todas las vueltas como CSV.",
      intro: [
        "Un cronómetro solo sirve si sus números se pueden creer. Este mide con el reloj del sistema del dispositivo en lugar de contar ticacs de temporizador: una vuelta marcada tras veinte minutos en otra pestaña sigue siendo exacta a la centésima de segundo. Inicie, pause, tome las vueltas que quiera y lea en la tabla el parcial de cada vuelta y el total acumulado.",
        "La tabla de vueltas es lo importante: los parciales muestran la forma de su esfuerzo — dónde aceleró, dónde decayó — y la columna total ancla cada vuelta al conjunto. Al terminar, un clic exporta todo como CSV (lap, split, total) que se abre directamente en una hoja de cálculo.",
      ],
      steps: [
        "Pulse Iniciar — la pantalla muestra minutos y segundos con precisión de centésimas.",
        "Pulse Vuelta en cada instante que quiera registrar; la última fila aparece siempre arriba.",
        "Pause y continúe con libertad; el tiempo acumulado se conserva exacto.",
        "Pulse Exportar CSV para descargar la tabla como lap,split,total — lista para su hoja de cálculo.",
      ],
      faqs: [
        {
          q: "¿Qué precisión tiene de verdad?",
          a: "La medición se ancla a Date.now(), así que el tiempo transcurrido es correcto pese a la limitación de pestañas o la suspensión del equipo: la pausa en el dibujo nunca se convierte en error del número. La pantalla se refresca unas treinta veces por segundo, así que lo que ve es la verdad de la centésima.",
        },
        {
          q: "¿Qué diferencia hay entre parcial y total?",
          a: "El parcial es el tiempo de esa vuelta sola — cuánto pasó desde la marca anterior. El total es el tiempo en marcha desde el primer Iniciar. Los corredores suelen mirar parciales; quien experimenta, totales — la tabla le da ambos.",
        },
        {
          q: "¿Qué contiene el CSV?",
          a: "Una fila de cabecera (lap, split, total) y una fila por vuelta, con los tiempos como M:SS.cc — por ejemplo 2,0:41.57,1:03.12. Se descarga como focusdash-laps.csv y se abre en Excel, Google Sheets o cualquier editor de texto.",
        },
        {
          q: "¿Sigue corriendo si cierro la pestaña?",
          a: "No — cerrar la pestaña termina la medición, y nada se guarda ni se envía. El cronómetro es deliberadamente sin estado: sus tiempos viven en el CSV exportado, no en un servidor.",
        },
      ],
    },
    pt: {
      name: "Cronômetro com voltas",
      h1: "Cronômetro online com tempos por volta",
      tagline:
        "Um cronômetro de precisão que registra parciais por volta e totais acumulados, não perde a hora em abas de fundo e exporta todas as voltas em CSV.",
      intro: [
        "Um cronômetro só serve se os números forem dignos de confiança. Este mede pelo relógio do sistema do aparelho em vez de contar tiques de temporizador: uma volta marcada depois de vinte minutos em outra aba continua exata ao centésimo de segundo. Inicie, pause, tome as voltas que precisar e leia na tabela o parcial de cada volta e o total acumulado.",
        "A tabela de voltas é o ponto: os parciais mostram a forma do seu esforço — onde acelerou, onde caiu — enquanto a coluna de total ancora cada volta no conjunto. Ao terminar, um clique exporta tudo como CSV (lap, split, total) que abre direto na planilha.",
      ],
      steps: [
        "Pressione Iniciar — o visor mostra minutos e segundos com precisão de centésimos.",
        "Pressione Volta em cada momento que quiser registrar; a última linha aparece sempre no topo.",
        "Pause e retome à vontade; o tempo acumulado é preservado exato.",
        "Pressione Exportar CSV para baixar a tabela como lap,split,total — pronta para a sua planilha.",
      ],
      faqs: [
        {
          q: "Qual é a precisão de verdade?",
          a: "A medição é ancorada em Date.now(), então o tempo decorrido fica correto mesmo com throttling de aba ou suspensão do aparelho — a pausa na renderização nunca vira erro no número. O visor atualiza umas trinta vezes por segundo: o que você vê é a verdade do centésimo.",
        },
        {
          q: "Qual a diferença entre parcial e total?",
          a: "O parcial é o tempo daquela volta sozinha — quanto passou desde a marcação anterior. O total é o tempo correndo desde o primeiro Iniciar. Corredores costumam olhar parciais; quem experimenta, totais — a tabela traz os dois.",
        },
        {
          q: "O que o CSV contém?",
          a: "Uma linha de cabeçalho (lap, split, total) e uma linha por volta, com tempos no formato M:SS.cc — por exemplo 2,0:41.57,1:03.12. Baixa como focusdash-laps.csv e abre no Excel, Google Sheets ou qualquer editor de texto.",
        },
        {
          q: "Continua rodando se eu fechar a aba?",
          a: "Não — fechar a aba encerra a medição, e nada é guardado ou enviado. O cronômetro é propositalmente sem estado: seus tempos vivem no CSV exportado, não num servidor.",
        },
      ],
    },
  },
});
