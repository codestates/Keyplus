import React, { useEffect, useRef, useState } from 'react';
import Question1 from '../components/Questions/Question1';
import Question2 from '../components/Questions/Question2';
import Question3 from '../components/Questions/Question3';
import Question4 from '../components/Questions/Question4';

const Survey = () => {
  //TODO: API 하나 더 만들어달라고 요청해야함
  //FIXME: 게이밍, 노이즈, 사운드 등등 useState로 만듬
  //클릭핸들러 함수

  const [isLoading, setIsLoading] = useState(true);

  const [isStarted, setIsStarted] = useState(false);
  const [gaming, setGaming] = useState(null);
  const [noise, setNoise] = useState(null);
  const [weight, setWeight] = useState(null);
  const [sound, setSound] = useState(null);

  const onClickStartBtn = () => {
    setIsStarted(true);
  };

  const onClickGaming = (res) => {
    setGaming(res);
  };

  const onClickNoise = (res) => {
    setNoise(res);
  };

  const onClickWeight = (res) => {
    setWeight(res);
  };

  const onClickSound = (res) => {
    setSound(res);
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // const response = await axios....;
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [sound]);

  if (!isStarted) {
    return (
      <>
        <button onClick={() => onClickStartBtn()}>START</button>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          iusto quae odio totam qui? Minus officiis adipisci, voluptatem earum
          eaque distinctio excepturi amet repellendus nemo ipsam? Ipsum quos
          voluptate expedita dolor soluta consequatur corporis, qui alias sit
          nisi, repudiandae cupiditate voluptates sunt animi, cumque a unde cum
          provident minima nulla non nostrum ducimus? Laudantium, modi! Nihil
          quis ratione nisi, necessitatibus, atque debitis aut, quaerat deserunt
          velit laborum deleniti eos exercitationem et. Ipsa aliquid voluptas,
          accusantium sunt repudiandae rerum laudantium, aspernatur fugiat omnis
          qui cupiditate placeat possimus ut vitae iusto animi modi corrupti,
          unde maiores! Repellendus voluptas accusamus voluptatem eveniet quae
          explicabo enim magni facilis quaerat alias. Dolore quia nobis nemo
          labore, distinctio quibusdam doloremque a pariatur repellat similique!
          Molestias assumenda enim, sit ratione quisquam eum perferendis alias
          excepturi eligendi quod, sunt nulla quis nisi nam iste dolores debitis
          possimus? Soluta fugit saepe tempora ratione perferendis dicta
          molestias omnis qui ex ea fuga minus expedita incidunt illum nemo cum
          autem aliquid eius, recusandae animi cupiditate, voluptatum quidem
          natus! Ipsa quo soluta cupiditate dignissimos blanditiis minima veniam
          beatae excepturi eius, deleniti, in consequuntur incidunt quisquam ab
          recusandae ipsam nam sunt sint repudiandae, nisi a commodi. Quidem est
          harum illum ea. Repellat cum nisi sint aliquid mollitia minus ipsum
          alias voluptates eum dignissimos? Voluptatibus provident laborum vel
          minus delectus officia ullam dolor amet nobis corporis, sit, quibusdam
          molestias aliquam placeat deleniti fugit voluptate illum neque sed
          rem, quod id eius alias eum. Voluptatem quae, tempora repellendus
          suscipit accusantium eligendi debitis obcaecati ipsam voluptas
          necessitatibus quos natus in velit, similique, maiores nostrum dolore.
          Delectus laboriosam voluptate magnam dignissimos minus inventore
          mollitia, velit cupiditate deleniti eligendi temporibus commodi nulla
          tempore? Iste consequuntur vitae inventore, reprehenderit quo aut quae
          eveniet autem, repellendus id corporis veritatis sed eligendi. Quis
          autem maxime cum sed, distinctio natus provident soluta assumenda
          sapiente architecto alias dicta eum quia doloribus obcaecati
          perferendis nesciunt, mollitia, esse tempore est debitis! Voluptatibus
          qui quas esse temporibus accusamus ipsum enim at architecto, eius
          porro sapiente nostrum iste harum ipsam voluptate eaque nisi expedita
          ratione ipsa ad. Ratione dicta numquam quae ipsam sed animi soluta
          molestias ex, iure eligendi dolor, repudiandae tempore. Temporibus
          officia necessitatibus et quibusdam culpa asperiores iure beatae vel,
          maiores, corporis pariatur aperiam debitis est tempora ad assumenda
          autem esse quis voluptatem consequatur aliquid omnis! Fugiat deserunt
          sunt dignissimos fugit, praesentium repellendus non laboriosam,
          eveniet at delectus porro eius dolorem ad, maiores veritatis
          explicabo. Quas sint iure dignissimos est facilis dolore consequuntur
          omnis nulla! Ut quas, facere possimus, aspernatur amet illo molestias
          voluptates voluptas, officiis eius labore. Repellat quam velit debitis
          dignissimos quia aut, ea iste quae atque. Commodi nobis vero, ea
          numquam autem quaerat voluptate voluptates ducimus corporis eveniet
          quidem provident voluptatibus nesciunt ad sunt fugit qui
          necessitatibus odit perferendis exercitationem, animi sed. Praesentium
          dignissimos, nemo eveniet perferendis nesciunt neque, molestiae
          dolorum provident atque odio nostrum incidunt. Eveniet possimus
          nostrum incidunt hic inventore! Sed animi impedit ipsam placeat
          dignissimos suscipit veritatis quos ratione adipisci vero est facilis
          voluptate, eveniet, asperiores officia quas enim. Tenetur ipsa dolorem
          ratione sed! Corporis vero itaque autem rerum, suscipit debitis at
          deleniti repellendus consequuntur iste sapiente corrupti quam iure
          obcaecati, sit temporibus natus alias laborum ab in veniam quo
          voluptates nisi. Assumenda rerum temporibus sapiente doloremque
          ratione eum minus culpa eos placeat officia, exercitationem at
          cupiditate quod aliquid voluptates magni quam ipsa architecto, unde a
          aut est necessitatibus laborum. Sit dicta enim illo voluptates
          incidunt quae eos ipsam adipisci dolore? Illo, facilis! Officiis aut
          eum beatae ut facere soluta voluptates, animi deserunt. Perspiciatis
          omnis a asperiores ipsam dicta rem reiciendis, odio eius delectus
          molestiae eaque quos earum voluptatibus inventore necessitatibus
          incidunt, iusto voluptate. Fugit iste distinctio illum incidunt ipsum
          harum odio beatae dolorum dolore facilis ullam nostrum, ex doloremque
          quasi modi quis maxime commodi non fugiat dolor numquam dolores? Optio
          deserunt in fuga quod totam ex placeat dolor impedit cupiditate
          commodi! Eos facere saepe voluptas dolore velit expedita illo, sequi
          sunt, eveniet qui nisi commodi assumenda nostrum. Incidunt quos veniam
          odit. Repudiandae autem, repellendus consequuntur minus iure totam
          veritatis facere ducimus voluptates itaque, atque error voluptatibus
          nemo fuga quidem assumenda recusandae! Quod rerum veniam vero
          laudantium blanditiis sit perferendis ea fugiat, ipsa nulla! Sed, cum
          perspiciatis deleniti iusto temporibus placeat suscipit tempore maxime
          libero labore laborum et. Doloremque at nihil repellendus suscipit
          odit animi aspernatur natus in aperiam autem temporibus amet
          asperiores, corrupti, nulla voluptatem illum dolorum perspiciatis qui
          magni harum sed accusamus? Debitis, necessitatibus, molestias error
          eum laboriosam nemo non odio magnam ratione eos iste ut. Atque quam
          doloremque, veniam corporis culpa necessitatibus provident ab!
          Necessitatibus sequi dolor enim animi accusamus. Libero consequatur a
          voluptates in facilis ipsa accusamus quisquam totam, vero laborum, ex,
          tempore porro enim quos fugiat veniam molestiae inventore iusto animi
          fuga! Quisquam aut iure deserunt assumenda. Rem autem doloremque qui
          aut repellat ab optio, delectus mollitia, expedita magni iusto? A
          totam hic harum consequuntur rem excepturi. Reiciendis, dolores
          nostrum! Quam necessitatibus sunt laboriosam quae fugit tempore quia
          sapiente veritatis, numquam harum, aliquam nulla? Odio non at esse
          sunt, tenetur aut ipsa magnam recusandae voluptatum itaque deserunt
          veritatis perferendis facilis quis nihil suscipit quas natus tempora
          reprehenderit blanditiis quia nemo pariatur. Suscipit rerum nesciunt
          nemo minus sint? Fugiat laboriosam, saepe exercitationem itaque, magni
          veniam consequuntur, mollitia aut maiores assumenda accusamus quam qui
          nisi? Unde pariatur qui sunt porro nihil a corporis voluptatem, neque
          mollitia nemo blanditiis consequatur veritatis delectus nam
          consequuntur officiis! Quidem nisi libero illo saepe velit culpa
          cupiditate aspernatur aliquid mollitia dolores ex magni quod est iusto
          optio, dolor ut illum inventore amet quisquam. Mollitia culpa velit
          accusantium, nulla quidem maxime voluptatem. Debitis quisquam dolorum
          dolor quo quidem. Fuga iure dolor harum, libero nobis laborum nam esse
          distinctio dolorem autem quas consectetur ipsam ea aliquid ut soluta
          unde vitae aperiam? Temporibus, doloremque minus delectus assumenda
          vero distinctio quia explicabo quam. Consequuntur dolorum, facilis
          explicabo vero aperiam expedita error odio ea. Incidunt neque
          recusandae quod perferendis doloremque earum voluptates ipsum est
          aperiam doloribus inventore deleniti iste, vero nam officiis
          necessitatibus consectetur ex sed rem omnis quibusdam! Quasi earum
          pariatur vitae dignissimos nam? Expedita voluptas nam iure ipsum
          nostrum, minima et sed debitis suscipit, ad porro voluptatibus ut
          commodi tenetur, asperiores alias modi. Asperiores reiciendis fugit
          magni quisquam delectus voluptate vero debitis, odit quasi aut. Error
          ullam blanditiis rerum vel animi, earum distinctio a mollitia cumque
          labore aut, rem aliquam culpa molestias fuga eaque. Consequatur
          commodi porro iure molestias similique voluptatibus error possimus.
          Dolore nesciunt distinctio at praesentium ratione molestias aut
          obcaecati quibusdam inventore voluptas. A nam perferendis ipsam
          commodi. Maiores nesciunt ratione enim odio dicta vitae soluta commodi
          voluptatem voluptas laborum accusantium, deserunt ea praesentium
          mollitia veritatis, optio vel sunt alias facere. Perferendis illum
          delectus totam iste, veritatis veniam voluptatibus, dolore dolor sint
          ex saepe officia tenetur reprehenderit reiciendis, minima maiores in.
          Ipsam, repellendus asperiores! Quis modi qui laborum culpa pariatur!
          Magni incidunt culpa nemo odit beatae sapiente, autem perferendis nisi
          non veniam at, fugiat accusantium laudantium ut tenetur repellendus
          laborum iusto deleniti voluptatibus! Alias rem voluptate sit qui est
          fugit tempora iusto vel, illo nobis exercitationem saepe et iure
          quidem, sed minima earum culpa libero similique explicabo possimus?
          Quam, expedita saepe? Quidem ipsum ut, molestias eius, mollitia beatae
          corporis soluta suscipit provident distinctio labore reprehenderit
          nulla. Itaque soluta consequatur dicta facilis perspiciatis tenetur,
          distinctio rem provident voluptates, eveniet ex minus, eos placeat!
          Beatae magnam ratione laudantium. Odit explicabo laborum nobis placeat
          quidem commodi eaque nulla natus earum iure deserunt officiis
          laudantium, accusamus delectus ipsum ex possimus magnam nam enim
          similique vitae dolores saepe. Neque earum aperiam dolorem consequatur
          accusamus, labore laboriosam suscipit ratione officiis minus ut
          dolores provident eius enim amet totam reprehenderit quidem,
          dignissimos iure? Deserunt enim placeat, laudantium beatae ut iusto
          dolor optio eum eos provident impedit excepturi facilis, dolorum harum
          ipsam quis, temporibus voluptates. Voluptates voluptas, ab at totam
          officiis provident odit dolorem laborum dicta est earum illum quidem
          quis explicabo aliquid hic perspiciatis ipsam doloremque veniam
          temporibus? Commodi perferendis hic nulla animi nostrum, numquam ut.
          Adipisci hic corrupti at vitae praesentium. Dolore nam eum at velit
          enim voluptate provident dignissimos minima? Quasi facere iste nemo
          laborum esse voluptatem, impedit praesentium dolore, consequatur
          similique minus soluta, dolores amet? Ratione, commodi neque modi
          nesciunt dolores mollitia. Et provident facilis deserunt beatae nisi
          inventore, illum hic fugiat perferendis, eaque ad, ut minima odio.
          Culpa magni mollitia error quidem! Inventore quibusdam a eligendi
          necessitatibus minima eum, alias molestias, modi perspiciatis vel,
          odio eveniet repellat placeat nostrum totam qui! Unde voluptas
          veritatis atque numquam! Ipsam neque magnam nemo labore! Eum
          perspiciatis maxime quae eveniet deleniti porro. Maxime voluptatem
          cumque quibusdam magni totam. Numquam tenetur iure dolor laborum!
          Accusantium recusandae nulla a ea minima quasi ipsa deserunt enim
          libero iure facilis vitae eos at debitis, repellendus suscipit
          perspiciatis? Assumenda doloribus distinctio quaerat accusamus
          temporibus iste reiciendis officia voluptate quis, id unde quibusdam
          aut rerum alias quos rem architecto veritatis deleniti labore.
          Dolorum, rem nesciunt? Impedit amet harum, corrupti unde esse qui
          dolores doloribus ex soluta necessitatibus omnis corporis, eligendi
          quas quos odio totam deleniti inventore earum saepe voluptatem
          obcaecati deserunt suscipit? Optio, corrupti voluptas odio totam
          quidem sint libero vitae enim quo quae commodi ratione maxime dolorum
          placeat ex voluptatibus iste voluptate suscipit, reiciendis magnam
          similique labore doloremque! Quis iste minus nesciunt tempore
          doloribus? Iure aliquid voluptatum quae iusto voluptates quam
          provident, accusamus, rerum enim possimus maiores sit hic ullam aut
          eius aspernatur cumque obcaecati. Repellat accusantium, magnam
          nesciunt non facilis quae optio cumque ad eaque animi quam ipsa
          corrupti velit! Odio voluptates quod nihil quibusdam! Consequatur
          corrupti necessitatibus soluta perspiciatis illum earum repellendus id
          nostrum, quos nesciunt perferendis? Repudiandae natus odio voluptates,
          voluptate assumenda ullam pariatur nostrum sunt, magni eligendi iure
          illum officiis quia exercitationem labore vel? Natus similique laborum
          dolor sit iste expedita cum accusamus quae quia corrupti? Dolorem,
          pariatur alias explicabo modi fugiat reprehenderit incidunt. Ullam
          sequi veritatis accusamus eaque, sed, deleniti similique eum voluptas
          quo perferendis possimus quisquam. Modi, at consectetur voluptates
          natus in nesciunt autem incidunt pariatur nemo perferendis,
          reprehenderit laudantium cupiditate accusamus mollitia, sit iste
          itaque molestias vel? Ex enim totam eum fugiat ad nihil odio a eos
          vitae aperiam distinctio magnam dolorem amet dolorum, sapiente
          quisquam commodi hic, tempore dicta culpa. Ab necessitatibus est
          eveniet itaque voluptatem, tempora corrupti numquam dolorum reiciendis
          voluptate incidunt impedit in voluptates vitae earum hic inventore
          iure aliquid ipsam provident. Voluptas sapiente voluptatem quam
          laborum harum nisi ipsum repudiandae, voluptates illum incidunt culpa
          quae sint veniam earum commodi rerum enim nesciunt similique mollitia?
          Sit iste dolorem id molestiae repellendus laboriosam rem distinctio
          optio velit quaerat, quidem culpa suscipit quae, incidunt omnis sequi
          officiis, voluptates facere voluptatibus nemo? Porro dolorum,
          voluptates quos excepturi dolore nostrum nesciunt provident placeat!
          Accusantium necessitatibus quasi, iste numquam ab id dignissimos
          corrupti odio rem quo, reprehenderit nihil, dolorum ex nesciunt
          voluptatum nam omnis adipisci. Nesciunt nobis vero quidem, dolor
          quibusdam quis voluptates libero doloribus, illo culpa repudiandae.
          Laudantium illo doloribus velit suscipit mollitia, earum tenetur
          aliquid maxime illum itaque, quam libero, nobis dolores enim?
          Accusantium aliquid, sequi minima placeat, laudantium minus earum
          voluptatem obcaecati nesciunt maiores temporibus ullam. Recusandae
          alias non quibusdam commodi. Mollitia velit molestiae dolore
          cupiditate nam nulla nihil excepturi, maiores obcaecati rem
          perspiciatis iusto corporis officiis eos, quisquam deleniti tempora
          impedit! Temporibus laudantium, tempora quam laboriosam necessitatibus
          enim amet expedita eos, est quidem aspernatur ipsa magni eaque
          incidunt nobis veritatis, quis neque ut sint ad sapiente non. Iusto,
          reiciendis? Expedita deserunt fugiat voluptates ut nulla, numquam
          perspiciatis velit, eaque, deleniti maiores incidunt eum. Est qui
          explicabo itaque sapiente consectetur! Eius, esse earum laborum totam
          fugiat obcaecati sequi quia ducimus itaque molestias autem deserunt!
          Nesciunt cupiditate numquam ea harum quae quisquam temporibus odio
          hic. Quidem, sit distinctio nisi est ut placeat quos voluptates
          veritatis ullam. Cupiditate, et natus iusto sapiente animi architecto
          unde magni at ab corporis sed consequuntur tempora nesciunt provident
          fugiat nobis autem laboriosam aliquid pariatur. Eveniet, expedita
          velit incidunt eos recusandae deserunt. Excepturi libero rerum iure
          reiciendis ut magnam ea vel accusamus voluptatibus! Animi iure magnam
          repudiandae soluta atque unde eius velit neque, ratione aliquam
          debitis dignissimos culpa porro harum, obcaecati ab reiciendis nihil.
          Ut nihil cumque magnam cum, esse, officiis possimus aperiam vero fugit
          illo harum officia atque quam suscipit itaque reprehenderit recusandae
          corrupti adipisci laudantium perspiciatis aspernatur quos nobis animi
          odit! Praesentium expedita quos, enim earum dicta quasi error? Fugiat
          similique cumque delectus quisquam ut cupiditate. Quos incidunt quia
          culpa molestiae cupiditate corporis. Alias, quaerat eum veritatis
          assumenda autem accusantium consectetur explicabo dolores. Eos aut
          quisquam reiciendis porro, dolor nesciunt autem corporis numquam
          blanditiis tempora aspernatur nostrum molestiae earum reprehenderit
          repudiandae iusto, possimus repellat excepturi quia doloremque
          consequatur in quos perspiciatis? Velit laboriosam nihil quo
          voluptatibus distinctio molestias natus repellat asperiores labore!
          Nisi soluta et similique suscipit mollitia laborum repudiandae
          asperiores, perspiciatis quidem tenetur magnam! Minus reprehenderit
          rerum, explicabo minima assumenda a exercitationem voluptas maxime
          asperiores quasi quidem ut iusto eveniet, officiis itaque voluptate?
          Officiis, laboriosam rerum ad qui maxime consequuntur dolore fugit
          quidem eligendi non natus molestias vel dolores ut, nesciunt deleniti
          consectetur adipisci, quis vitae ipsa! Reiciendis ratione consequatur
          mollitia nesciunt provident distinctio dolores animi natus tenetur
          deserunt, harum rem hic culpa sapiente velit. Nisi quidem suscipit
          reprehenderit reiciendis distinctio. Nihil praesentium eligendi
          nostrum aut laborum beatae aperiam aliquid quas facilis nisi. Rerum
          hic, magnam voluptate quasi cum molestias unde repellendus ratione.
          Sunt perspiciatis culpa, quos nemo necessitatibus placeat, facere nisi
          ipsam repellendus, repellat quam numquam magni atque ducimus eveniet.
          Ab dolorum adipisci alias error ad, rem iure quisquam voluptates
          praesentium optio excepturi esse, sed, tempore explicabo
          reprehenderit. Reprehenderit, iste inventore! Voluptate, possimus
          praesentium sed laboriosam dolor, laborum quis harum maxime
          reprehenderit consequuntur labore vel non alias dolorem ipsa! Rerum
          impedit necessitatibus magnam sapiente cum ipsa quisquam at nulla
          adipisci, autem repudiandae excepturi? Ipsa ipsum labore placeat rem
          ab, magni dolor incidunt inventore officia dignissimos a asperiores
          tempora perferendis ad ipsam! Cum id ipsa beatae, sunt provident ea
          voluptatibus ullam error. Accusantium, labore repellat ad suscipit
          eaque alias dolorem! Tenetur dicta atque impedit sunt veniam, aliquid
          soluta laborum ex nostrum, unde non explicabo ullam magnam? Blanditiis
          iusto ipsum error dolore reiciendis incidunt sit eos sequi!
          Aspernatur, expedita eligendi. Corrupti amet eaque odit enim
          praesentium possimus recusandae aspernatur laboriosam debitis. Eaque
          sed animi accusantium quasi aperiam, voluptatibus cupiditate? Numquam
          hic iste magnam incidunt assumenda autem saepe itaque quaerat modi, ad
          omnis aperiam voluptatibus natus excepturi vitae ab eaque molestias
          nisi corrupti, quod ratione ipsum, dicta consequatur. Odio vero ut
          tenetur, cumque itaque molestiae adipisci placeat possimus ullam
          libero architecto esse error voluptates quia fuga inventore quo illo!
          Nemo consectetur architecto, culpa quia quo corrupti illo officia ut
          eaque, asperiores labore impedit vel, molestiae quae? Mollitia, at.
          Soluta perspiciatis laborum dolore consectetur quos enim cupiditate
          expedita recusandae nesciunt doloribus itaque eius, nostrum facilis
          ducimus mollitia ab maxime rem temporibus neque autem? A deleniti modi
          eaque sunt necessitatibus molestias, dolore iure quo vel eligendi
          adipisci, quis fugit, maxime eum natus recusandae nihil nam officia
          sequi praesentium porro aperiam tenetur laborum nemo! Esse
          accusantium, corrupti alias eum commodi aut amet debitis in sed eaque
          asperiores unde facere consequatur mollitia ea. Repudiandae corporis
          laborum quo in perferendis ipsam, eveniet quidem non, atque, culpa
          veniam eaque maxime. Sunt excepturi magnam officiis perferendis eum
          voluptate consequuntur labore rerum reprehenderit velit distinctio
          dolorum minus quam laudantium at repudiandae illum, quisquam
          doloremque vitae blanditiis minima dolor. Incidunt voluptatem magnam
          architecto modi harum excepturi perferendis quasi. Harum, atque
          explicabo! Minus iusto incidunt pariatur odio autem expedita fugiat
          doloribus et, excepturi sequi esse labore. Totam reprehenderit
          molestiae officia odit sit nostrum aut? Est nihil harum nulla. Quod
          quisquam suscipit iusto enim at commodi maiores veniam dolore voluptas
          aspernatur rerum modi repudiandae, quasi itaque fugiat. Consequuntur,
          incidunt illo? Consequatur reprehenderit, officia animi adipisci saepe
          sed similique error modi sit eos fugit alias aspernatur, vel voluptate
          incidunt ipsam maxime. Similique ullam vero saepe sed expedita qui
          ipsam voluptate labore officiis iusto exercitationem corrupti tempore
          dicta totam dolores fugiat quibusdam explicabo, cumque eius. Quae
          accusamus minus non libero impedit, dolorum quia aliquid temporibus
          assumenda nihil cum illo voluptas, dolor expedita odio unde, veritatis
          odit perferendis alias dolore sunt consectetur. Quibusdam, minima vero
          dolorem molestiae corporis quis eveniet doloremque a quo voluptates
          suscipit veniam natus assumenda eligendi, dolores perferendis, vitae
          sed consectetur amet. Quo iure, quis officiis impedit molestiae
          architecto rerum possimus, natus quasi dolorem delectus recusandae
          praesentium mollitia dolorum, nulla maxime harum iusto sit blanditiis
          consequatur? Inventore autem delectus mollitia libero molestiae,
          aliquid ullam ipsum ad quidem dignissimos facilis, praesentium illum
          eos quaerat consectetur molestias minima nobis doloribus. Blanditiis,
          vero asperiores architecto illum nisi cum distinctio id deserunt
          praesentium ea voluptatibus, quidem eaque, unde atque eligendi beatae
          magni odit in ex temporibus est ducimus enim nulla consequatur. Itaque
          repellat quasi excepturi aspernatur tempora ratione hic blanditiis
          vitae corporis harum fugiat deserunt id voluptatum ex sunt labore a,
          molestiae, consectetur quae dicta inventore totam reprehenderit esse
          quam! Repellendus similique blanditiis earum nostrum, at quas. Dolorem
          fugiat sequi amet labore incidunt quos! Laudantium praesentium, sequi
          eveniet nam error consectetur excepturi at repellat mollitia dolores
          delectus saepe illum placeat totam et ea quaerat fuga suscipit
          voluptatum velit natus? Error omnis quod cum delectus quisquam maxime
          neque illum, sit hic corporis culpa quibusdam sed explicabo eum rem
          molestiae distinctio facilis, deserunt veniam maiores repudiandae
          necessitatibus rerum vero accusamus. Alias neque iure, nobis natus
          mollitia accusamus eum! Veniam delectus quisquam illo corporis quis
          consequatur, facere maiores natus quia at nobis libero suscipit! A in
          nam, quaerat laboriosam commodi quo, esse et quae praesentium maxime
          doloribus id? Reprehenderit consectetur eligendi illo saepe officiis
          facilis, corporis hic error quaerat tempore. Recusandae vero dicta,
          quibusdam soluta placeat, amet est et libero in quis aperiam culpa
          error! Doloribus est commodi, sequi rerum accusamus obcaecati ab animi
          in ad nobis, fugiat sed at quam repellat non unde cupiditate aliquid
          id assumenda expedita. Adipisci quam accusantium harum laboriosam a
          tempore aperiam nihil esse odit minus blanditiis earum voluptatem,
          possimus quas ipsam, incidunt natus odio, pariatur ut temporibus ex
          eveniet aspernatur error! Suscipit, animi, molestias numquam labore,
          voluptatibus porro magni natus libero eos cum minus dicta consectetur
          sapiente possimus dolorem? Quis distinctio atque ad culpa! Numquam,
          aliquid harum porro doloribus qui ipsum consequuntur, ad perferendis
          earum sit maiores voluptas excepturi illo. Voluptate commodi
          perferendis, magni ab unde provident, odit itaque dolores aut
          laudantium iure facere vel odio dolore doloremque voluptatem, iste
          error voluptas repellendus? Inventore aliquam veniam et fugit corporis
          quis asperiores dolores, cumque voluptatum quo aliquid, consequuntur
          rerum error ullam totam. Nulla quisquam exercitationem adipisci nisi
          quidem? Similique facere natus asperiores modi debitis ad veniam
          officiis quae, error, sapiente distinctio provident fuga doloribus
          laboriosam animi tempore porro? Est temporibus, cupiditate iusto eos
          corrupti labore earum officia ratione culpa aut eaque quasi sunt ad
          placeat dolores ut possimus distinctio nisi tempore fugiat eum dolor
          magni. Dolorum cumque harum, ullam voluptatum nemo soluta quasi,
          deleniti libero ducimus architecto illo corporis nulla in, neque
          laudantium ipsum provident? Provident dolor doloremque mollitia
          aperiam reiciendis incidunt reprehenderit esse praesentium
          voluptatibus itaque repellendus ut, ducimus nemo eius quisquam
          temporibus illum non ullam, numquam id. Laboriosam, laudantium
          sapiente? Cupiditate, provident recusandae. Aliquam, a doloremque!
          Illo sequi aspernatur earum eum dolorem officiis aliquam. Temporibus,
          maiores odit odio et porro in veritatis id ut obcaecati sed fugit
          fugiat fuga eum natus earum omnis incidunt rem nam deleniti hic
          soluta. Eius dolorum provident, quasi voluptatibus, ipsa atque officia
          cupiditate porro neque voluptate alias esse quia dolore doloribus
          iste. Ducimus voluptatum blanditiis, voluptatem at suscipit delectus
          molestiae iusto voluptatibus explicabo vitae minima rerum quaerat quae
          sunt dolore assumenda quod deserunt a unde! Quos delectus cum placeat,
          veniam aliquid obcaecati corporis minima explicabo suscipit, neque
          molestias minus at exercitationem odio architecto numquam voluptas
          esse facilis eos. Dolore nobis, voluptatum ratione dolores iusto
          delectus vel nemo! Suscipit culpa officia expedita quaerat corrupti
          consequuntur recusandae mollitia facere debitis laboriosam quam
          dolores numquam minus earum, nobis itaque enim quod porro quasi atque
          eaque reprehenderit praesentium architecto molestiae. Mollitia quos
          libero quisquam expedita placeat exercitationem et optio enim
          voluptates? Nesciunt, natus repellat rem voluptate laboriosam
          dignissimos? Vitae dicta officiis ratione consectetur nulla suscipit
          necessitatibus, iste distinctio placeat. Praesentium officia vitae,
          rerum aperiam expedita quaerat hic quo, obcaecati aliquid qui
          dignissimos impedit! Modi explicabo atque, error doloremque
          praesentium voluptatum porro commodi quis fuga quo numquam cupiditate
          asperiores possimus libero neque ab eos voluptates placeat odio
          excepturi tenetur saepe! Cupiditate voluptate illum voluptatibus iure
          natus! Asperiores culpa suscipit eos saepe. Adipisci, aliquid! Commodi
          aliquam exercitationem voluptatibus fugit. Natus explicabo nemo illo
          neque expedita libero, architecto repellendus qui impedit magnam ea
          iusto suscipit quo odit consequatur facilis dolorem nobis excepturi
          deserunt totam cum perspiciatis dolorum numquam sit. Explicabo
          temporibus molestiae dolores obcaecati incidunt inventore ea numquam
          quasi architecto excepturi, debitis ratione optio, minima eaque qui
          quam fugit repellat impedit aut pariatur iusto sed. Nobis porro
          accusamus nam ad doloremque iusto facere aut perspiciatis! Ipsa
          distinctio mollitia perferendis cupiditate, ratione voluptas iusto
          error dolores magnam optio omnis dicta, doloribus debitis magni
          incidunt adipisci! Fugit fugiat vel eius alias maiores nemo!
          Temporibus animi numquam ipsam repellendus quis similique eius ab
          dolorem accusantium eos! Provident, molestiae odio. Excepturi vitae,
          odit quaerat totam, dolor, veritatis repellat sit ad nobis voluptas
          soluta! Optio ipsum accusantium ducimus! Laudantium saepe deleniti
          libero in, excepturi omnis culpa quidem veniam adipisci non tempore
          sapiente fuga hic recusandae maxime alias exercitationem unde dolore
          corporis, numquam voluptas doloremque. Asperiores sapiente magnam in,
          dolores ratione incidunt sunt amet eius reiciendis odit expedita
          animi, quod nam aliquam corrupti molestiae, architecto dicta rem cum
          est suscipit voluptatem fugit sed! Odit modi nisi dolorem laudantium
          nostrum maxime, tenetur odio atque. Accusamus fugit ipsam et harum sed
          minima velit maiores esse hic expedita nemo assumenda quia quis
          perspiciatis, aliquam, tempora modi error id eveniet quaerat
          reprehenderit cum, laborum dolorum tempore! Laboriosam fugit repellat
          excepturi cum veritatis, nam, ipsam quisquam, repudiandae debitis
          ullam iure quidem provident. Repellat fuga dolor, vel veniam maiores
          similique officia quas, voluptate voluptatum porro exercitationem
          eligendi, nisi quae repudiandae rerum aspernatur pariatur ducimus
          earum eaque delectus velit. Facilis sit magni accusamus repellendus,
          maiores molestias nobis molestiae. Animi cupiditate sequi deserunt
          eius totam repudiandae deleniti nam rerum ipsum porro sed, aliquid
          reprehenderit laborum a quod tenetur voluptates aliquam ullam delectus
          fuga repellat incidunt! Perspiciatis placeat dicta ipsum quo dolor,
          similique ipsam autem recusandae, harum nihil sit blanditiis ullam,
          reprehenderit qui expedita quas! Minus neque odit error itaque ullam
          amet quibusdam, sit illum beatae nostrum non totam quia ad, labore
          praesentium debitis ducimus dolor magnam nihil vero nisi quos
          voluptatem dolorum? Vel maiores sunt impedit officiis enim maxime
          aliquam quidem quisquam. Maiores aspernatur assumenda exercitationem
          alias quasi. Sed a quidem eius eos minus! Nam ea itaque sint, rerum
          consectetur minima eligendi blanditiis atque architecto commodi
          provident dicta vel, consequuntur maxime saepe culpa? Magni, earum
          nemo! Eum repudiandae dolore facere, non aliquam aperiam quam numquam
          ipsa officiis, obcaecati, enim cupiditate perspiciatis error hic odit
          corrupti a. Sit minus, earum laborum rem corrupti consequatur velit
          molestias enim quos eveniet reiciendis exercitationem nam nihil
          doloremque recusandae facilis iusto voluptas nesciunt aliquid dolor
          maxime totam natus accusantium inventore? Sed amet consequuntur
          impedit quos corporis! Autem deleniti veritatis rerum perferendis
          dolor cupiditate ipsum, laboriosam at quae rem debitis distinctio
          aliquam aperiam? Aut placeat a tempore odio excepturi consequuntur,
          quaerat, nemo eius accusamus dignissimos perspiciatis voluptatum sunt
          iure architecto libero qui expedita assumenda, illo amet saepe dolorum
          nam! Voluptatum, voluptas quas delectus minus sequi quod, rerum
          repellendus inventore sapiente nostrum voluptate enim cupiditate
          quibusdam labore sit quisquam asperiores reprehenderit excepturi
          deserunt earum numquam cum molestiae illum consectetur. Fuga facere et
          sint. Minus tempora sint soluta consequuntur, et nihil laudantium
          placeat iusto aliquam obcaecati tenetur ipsum quae id, perspiciatis
          autem nam repellat quibusdam numquam animi neque molestiae suscipit
          eaque atque architecto. Quod voluptas suscipit dolores laborum sequi
          adipisci neque velit ab distinctio molestiae, deserunt a aliquam
          eaque, obcaecati sunt porro nemo doloremque corporis est error?
          Sapiente, at velit. Numquam nostrum accusantium itaque. Numquam quas,
          repellendus iusto ipsum, vitae ad magni voluptate et quasi corporis
          quisquam non! Veniam dolore blanditiis minus facilis earum, laborum
          pariatur temporibus accusamus totam nobis quaerat nihil vero illum
          ullam saepe nostrum cumque velit eligendi enim officiis repudiandae
          ipsum labore magnam quos? Fugiat modi ullam dolor magnam optio
          doloremque sit tempora, ratione ab libero, neque odit enim! Iusto,
          amet et quidem quam porro ea totam, quibusdam nobis aliquam animi cum
          corrupti dolores similique incidunt minima tempora ducimus? Earum
          facere accusamus temporibus saepe fugit dignissimos eligendi, corrupti
          eaque laborum, modi illum. Sit quisquam saepe, dolor iste laudantium,
          explicabo cupiditate voluptatibus sed necessitatibus maiores
          temporibus. Sapiente perspiciatis reiciendis quaerat mollitia nihil ea
          fugit aliquid, ad eligendi corporis autem pariatur illo dolore dicta
          reprehenderit cumque nulla assumenda corrupti totam soluta ducimus sit
          doloribus tempora neque. Maiores, quas velit necessitatibus quia
          asperiores consequatur nisi repudiandae error illo perferendis qui
          inventore optio cum quae officiis sunt officia obcaecati sapiente
          facere. Vero delectus doloremque vel nisi, perspiciatis officia nemo
          pariatur natus eveniet velit exercitationem harum incidunt soluta non
          voluptatem consequuntur, laudantium, sunt perferendis saepe odio
          suscipit cupiditate adipisci earum! Reiciendis doloremque sequi
          quisquam laborum culpa illo molestiae magnam modi ipsum beatae. Error
          quisquam sed quas dolore ad voluptas laborum eveniet ex consequatur
          corrupti, accusamus et minima in odio fugiat quaerat itaque libero,
          ducimus aspernatur ipsam aperiam ratione, laudantium quidem ipsum!
          Quia, minima. Non ratione esse impedit consequatur dolores officiis
          labore pariatur voluptatem quos, eaque voluptatibus ad iste qui sit
          asperiores commodi harum nobis odio facere saepe? Sint aliquam aliquid
          est quos temporibus impedit esse quod, dolorum laboriosam ex nulla
          neque eaque, distinctio ipsum itaque ipsam molestias, architecto hic
          qui vitae cum in asperiores excepturi laborum. Repellat incidunt
          itaque error fugit quaerat, nesciunt est non earum suscipit odio
          voluptate beatae delectus animi perferendis. Saepe voluptatem
          voluptatum molestiae deserunt eius expedita alias nostrum
          exercitationem aspernatur commodi. Ipsa quibusdam officia labore
          facilis, reiciendis, quisquam eveniet eius, nobis repellat modi
          dignissimos necessitatibus provident nemo dolore. Dignissimos
          similique assumenda quibusdam numquam adipisci, modi enim sequi nulla,
          nemo dolorum facilis facere ratione aperiam optio, hic nam explicabo!
          Culpa, quibusdam dignissimos magni inventore iure ipsa placeat tempora
          et consectetur tenetur maiores corrupti omnis! Ab fugiat modi deserunt
          corporis vero voluptatum enim ratione facere doloribus, debitis
          repudiandae esse, ex, culpa rem. Nostrum corporis impedit deserunt rem
          porro vero consequatur atque iure voluptatibus amet cupiditate alias
          explicabo eaque, quam nisi earum rerum delectus laboriosam fuga
          perferendis voluptatem in exercitationem aut. Quibusdam veniam et,
          impedit iusto explicabo maiores soluta aperiam? Officia deserunt
          veritatis, eligendi ad velit, natus ipsam, aliquam pariatur et
          praesentium fuga? Maiores, dolores libero voluptate animi similique
          mollitia sint eaque nostrum dolore sequi quisquam? Quis vel odio cum
          suscipit, id deserunt eos deleniti rem eveniet quasi voluptatibus
          tempore reiciendis repudiandae adipisci quidem minima nesciunt facere!
          Provident, similique molestiae delectus minima amet tempora fuga
          ratione voluptatum laboriosam quibusdam mollitia vero, illo debitis,
          iusto autem iure eveniet molestias repellat quod magnam nemo
          cupiditate velit quos? Inventore, eligendi! Eveniet voluptatum non
          itaque, a fugit earum? Voluptatibus nihil reiciendis tempore quo? Non
          excepturi distinctio debitis perferendis dolorem minima voluptate,
          dolores culpa! Neque maxime praesentium ipsa laudantium dignissimos,
          sapiente possimus libero. Quasi aperiam velit molestiae similique odio
          accusantium beatae atque repudiandae eum aut excepturi, necessitatibus
          asperiores perspiciatis modi porro facilis quam, ut explicabo
          cupiditate alias officia inventore, expedita officiis sint. Culpa odit
          libero deserunt consequuntur harum, veritatis et neque mollitia rerum
          vero non hic error, nesciunt dignissimos repellendus in, ipsum earum
          sed unde maxime! Sint porro iste soluta velit eum molestias voluptates
          dicta tempore dolores ratione odit nobis numquam modi consequatur,
          aspernatur quibusdam maxime! Dolorem provident ab, minima accusamus
          sequi eligendi, accusantium iusto esse dolores quisquam deserunt,
          maxime voluptatibus nulla blanditiis quod repellat? Debitis eligendi
          maiores maxime asperiores molestiae voluptatum voluptas vitae quia
          voluptatem minima dolor laboriosam quo, id doloribus laborum, quod
          sunt consequatur sed quam expedita. Architecto eos rerum repellendus
          qui! Beatae, dolorem rem repellendus autem repellat ut. Asperiores
          nulla suscipit alias magni, neque consequuntur. Reprehenderit ipsam
          blanditiis quas debitis odit? Deserunt accusantium aspernatur modi
          molestias quos, natus reiciendis eligendi cum odio iure maiores itaque
          recusandae labore, nam, magnam temporibus est assumenda? Hic,
          accusamus nostrum inventore incidunt et reiciendis vel voluptatum
          neque ipsam perferendis sed molestias quo tenetur illo fuga.
          Voluptatibus maxime nihil sunt officia quidem autem, doloribus neque
          molestias similique libero non sit unde facere delectus eligendi
          doloremque pariatur, accusantium minima quos? Soluta, iure. Distinctio
          dolorum nisi accusamus odio, aliquam repellat in assumenda, sunt
          libero ab aliquid et necessitatibus placeat quisquam enim nam eius
          veritatis, omnis praesentium impedit. Similique modi nobis odit quidem
          quos obcaecati repellendus rerum, possimus temporibus mollitia
          pariatur delectus libero, culpa tenetur hic dolore ab dolores fugiat
          optio corporis, aliquid eius quisquam facilis. Possimus repellat
          tempora a suscipit natus quam ut eveniet repellendus consectetur,
          maiores alias distinctio pariatur modi fugit incidunt, obcaecati saepe
          tempore blanditiis similique. Commodi excepturi non dolore atque
          officia illum quos doloribus impedit quam magni labore unde quia iure
          voluptatem exercitationem ex, numquam incidunt? Aut, voluptatem
          similique dolores obcaecati neque corporis amet vitae, quae debitis
          nihil modi vel. Dolorem quibusdam mollitia libero aut quisquam
          temporibus recusandae iste obcaecati, quaerat rerum et blanditiis
          consectetur beatae alias. Ut itaque cum ad, natus nemo culpa quisquam
          quam omnis iste animi alias molestiae explicabo corporis earum debitis
          exercitationem quibusdam nostrum et aut. Tempore officiis nostrum
          perferendis ea, dignissimos itaque, voluptatem veritatis alias rerum
          enim, aliquid id eos adipisci accusantium exercitationem nihil commodi
          corrupti unde. Sed eaque cupiditate repellendus voluptas voluptates.
          Quam reiciendis esse officiis eum reprehenderit cupiditate amet.
          Possimus doloremque quod eos maiores officiis quaerat amet magnam
          dolore veniam atque soluta modi consequatur consequuntur repellat
          labore vitae tempora, eum dignissimos dolorum beatae reiciendis sint
          qui! Dignissimos consectetur molestiae et perspiciatis quos! Sint
          natus laboriosam error repellat quidem neque rem explicabo quibusdam
          ipsum alias officiis consectetur tenetur ipsam sed placeat unde
          reiciendis voluptates illo, quisquam repellendus hic! Atque iusto
          placeat provident in consequuntur cumque voluptatum deleniti at, odit
          earum aliquid dolorem! Odio vero culpa perferendis id impedit
          praesentium itaque quo ipsa incidunt, laboriosam beatae similique at?
          Soluta accusantium cum beatae aliquid quibusdam rerum, architecto
          atque. Sed quos, est pariatur corrupti deleniti odit nulla molestiae,
          nam totam veritatis molestias repellat sunt consectetur ex fugiat
          expedita cumque saepe, porro numquam.
        </div>
      </>
    );
  } else {
    if (gaming === null) {
      return (
        <>
          <Question1 onClickGaming={onClickGaming} />
        </>
      );
    } else if (noise === null) {
      return (
        <>
          <Question2 onClickNoise={onClickNoise} />
        </>
      );
    } else if (weight === null) {
      return (
        <>
          <Question3 onClickWeight={onClickWeight} />
        </>
      );
    } else if (sound === null) {
      return (
        <>
          <Question4 onClickSound={onClickSound} />
        </>
      );
    } else {
      return (
        <>
          {isLoading ? (
            <div>잠시만 기다려주세요..</div>
          ) : (
            <div>당신의 결과는~~~</div>
          )}
        </>
      );
    }
  }
};

export default Survey;
