import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { ALL_TOOLS } from "@/tools/registry";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const CONTENT: Partial<Record<Locale, string[]>> = {
  en: [
    "FocusDash is a set of focus and timer tools that run entirely in your browser. There is no backend: the seconds you count are computed by JavaScript on your own device, from your device's own clock.",
    "That design gives us three properties we care about. It is private by construction — there is nothing to upload, so nothing can leak. It is reliable — timers stay anchored to the system clock, so background tabs, screen locks and laptop sleep never cost you a second. And it is honest — every tool does exactly what the page says, no tricks.",
    "Today the set covers the Pomodoro technique, the Flowtime technique, a lap stopwatch and multi-countdowns — the four rhythms most working days are made of. It is available in fifteen languages, and nothing you time is ever stored or sent anywhere.",
  ],
  zh: [
    "FocusDash 是一组完全在浏览器里运行的专注与计时工具。没有后端:你数的每一秒,都由你自己设备上的 JavaScript、用你自己设备的时钟算出来。",
    "这个设计带来三个我们看重的性质:隐私是构造出来的——没有上传,就谈不上泄露;可靠——计时锚定系统时钟,切后台、锁屏、休眠都不掉一秒;诚实——每个工具都做页面所说的事,不玩花样。",
    "目前的工具覆盖番茄工作法、Flowtime 心流法、计段秒表和多路倒计时——大多数工作日由这四种节奏构成。全站十五种语言,你计的任何东西都不会被存储或发送到任何地方。",
  ],
  ja: [
    "FocusDash は、完全にブラウザ内で動く集中・計時ツールのコレクションです。バックエンドはありません。数える秒は、すべて自分のデバイス上の JavaScript が、自分のデバイスの時計から計算します。",
    "この設計には、私たちが大切にする 3 つの性質があります。プライバシーは構造的に保証される(アップロードがないので漏えいもない)、信頼できる(計時はシステム時計に固定され、バックグラウンド・ロック・スリープでも 1 秒も狂わない)、そして誠実(各ツールはページに書かれた通りのことだけをする)。",
    "現在のラインナップは、ポモドーロ、フロータイム、ラップ付きストップウォッチ、複数カウントダウン——働く日のリズムのほとんどを占める 4 つです。15 言語に対応し、計ったものが保存されたり送信されたりすることはありません。",
  ],
  es: [
    "FocusDash es un conjunto de herramientas de enfoque y medición de tiempo que funcionan por completo en su navegador. No hay backend: los segundos que cuenta los calcula el JavaScript de su propio dispositivo, con el reloj de su propio dispositivo.",
    "Ese diseño nos da tres propiedades que nos importan. Privacidad por construcción: no hay subidas, así que no puede haber fugas. Fiabilidad: la medición se ancla al reloj del sistema, y cambiar de pestaña, bloquear la pantalla o suspender el portátil no cuesta ni un segundo. Honestidad: cada herramienta hace exactamente lo que dice su página.",
    "Hoy el conjunto cubre la técnica Pomodoro, la técnica Flowtime, un cronómetro con vueltas y cuentas atrás múltiples — los cuatro ritmos con que se hace la mayoría de los días de trabajo. En quince idiomas, y nada de lo que mida se guarda ni se envía a ninguna parte.",
  ],
  pt: [
    "O FocusDash é um conjunto de ferramentas de foco e medição de tempo que rodam inteiramente no seu navegador. Não há backend: os segundos que você conta são calculados pelo JavaScript do seu próprio aparelho, pelo relógio do próprio aparelho.",
    "Esse design nos dá três propriedades que valorizamos. Privacidade por construção: não há uploads, logo não há vazamentos. Confiabilidade: a medição fica ancorada no relógio do sistema — trocar de aba, bloquear a tela ou deixar o notebook dormir não custa um segundo. Honestidade: cada ferramenta faz exatamente o que a página diz.",
    "Hoje o conjunto cobre a técnica Pomodoro, a técnica Flowtime, um cronômetro com voltas e contagens regressivas múltiplas — os quatro ritmos que compõem a maior parte dos dias de trabalho. Em quinze idiomas, e nada do que você cronometra é guardado ou enviado a lugar algum.",
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang as Locale);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead title={t.nav.about} />
      <Prose paragraphs={CONTENT[lang as Locale] ?? CONTENT.en!} />
      <p className="mt-6 text-[14px] text-[var(--color-sub)]">
        {ALL_TOOLS.length} tools · {LOCALES.length} languages
      </p>
    </Container>
  );
}
