import React, { useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Keyboard = () => {
  useEffect(async () => {
    try {
      const token = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/checkToken`
      );
      console.log(token.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quam dolor
        odit asperiores aperiam soluta nostrum, rerum ullam eos facilis, libero
        ipsum eius blanditiis non nesciunt provident! Consectetur, optio!
        Necessitatibus dolore libero quasi culpa. Qui perferendis neque, ab,
        harum soluta inventore ullam, maiores veritatis eum architecto fuga unde
        maxime facere ipsa voluptatibus ad atque. Quibusdam vitae, quam quae
        eius expedita eveniet doloribus aperiam, voluptatem quas nemo
        consequatur impedit illo vero? Consectetur culpa nemo quisquam. Ipsa
        quae fuga quod, non aperiam repellendus id aliquid nam dolorum nobis,
        dolor possimus mollitia eos quaerat veritatis facere dicta alias minima
        quibusdam aut. Vero maxime, tempora mollitia rerum culpa temporibus
        animi tenetur est laudantium eos, numquam, quas officiis beatae pariatur
        possimus amet aspernatur perspiciatis facere quod rem voluptate cum ea
        dolorum ipsum! Quibusdam ducimus cupiditate animi. Similique veniam
        praesentium eveniet amet dolores? Nam dicta explicabo aliquam molestiae
        ad consectetur ea? Accusamus soluta quibusdam necessitatibus quaerat
        dolore exercitationem eligendi incidunt saepe culpa consequuntur eaque
        magni asperiores obcaecati aut sequi provident nostrum officiis autem,
        expedita ipsa quae fugiat! A laboriosam perspiciatis, minima natus
        debitis tempora esse vel odio nam adipisci beatae cumque ratione cum
        deleniti maiores assumenda officia! Reiciendis rerum dicta assumenda
        eius voluptatibus omnis voluptatem et enim veniam aperiam ducimus ullam
        quam, tenetur dolores, sunt magnam voluptas odio iste dolor perferendis.
        Quisquam ipsam aliquid animi, tenetur optio ad ab dolor enim quam
        mollitia quibusdam nostrum voluptate reprehenderit, atque, illum
        consequatur? Expedita quia recusandae ea voluptate tempora quas
        cupiditate iure est, ipsam voluptas quidem at aspernatur illo ex earum
        illum! Non ratione, veniam quibusdam fugit magni eaque quia voluptatem
        ullam ex iste delectus, impedit reiciendis, error odit aliquam
        consequuntur aspernatur unde repellat nesciunt cum ducimus sit excepturi
        esse. Autem ipsam soluta cumque, voluptatibus alias quos qui non iure,
        saepe expedita eum quod doloribus nesciunt repudiandae numquam rerum
        accusantium architecto. Officia dolores totam, ratione ad et iusto eum,
        voluptas iste laborum qui suscipit. Culpa labore consequatur unde, nihil
        deserunt vitae maiores laboriosam aspernatur omnis iure voluptatum
        sapiente quas autem pariatur! Modi deleniti ullam tempore incidunt
        excepturi adipisci dolores quaerat quae officiis animi hic eius dolorum
        eos, iste laudantium commodi atque quasi? A autem odit neque nam in
        beatae, iusto explicabo inventore obcaecati ducimus error enim, commodi
        alias vitae est magnam officiis accusantium labore provident soluta
        expedita! Facere commodi expedita totam officiis, asperiores
        perspiciatis, optio maxime voluptatem itaque odit rerum? Sequi est
        accusamus impedit quae reprehenderit nostrum ipsam officiis quisquam
        nulla sit provident voluptas qui commodi sunt officia quis error, ipsa
        eum expedita veniam quod! Eveniet consectetur blanditiis omnis repellat
        rem a libero laboriosam esse. Corrupti sint perspiciatis possimus illum
        hic, ea ipsa consequuntur rerum vero esse ullam rem ipsum debitis autem
        a distinctio praesentium fugiat soluta! Inventore fugit voluptatem sunt
        amet quia voluptate possimus at corporis tenetur non! Quidem aliquid
        tempora culpa est mollitia impedit blanditiis distinctio corporis, esse
        nobis ullam rerum at, assumenda ad itaque amet quia eius quos nam.
        Facilis ullam voluptatem possimus ab molestias quidem quisquam minima,
        ad nihil rerum, est, illum maxime architecto. Necessitatibus accusamus
        id aspernatur aperiam? Dolorem aliquid, tempora repellat accusantium,
        aliquam voluptates ut quam nesciunt doloremque recusandae voluptatibus
        cupiditate dignissimos impedit suscipit minus dolore. Reiciendis facilis
        quaerat dolore tempora ad nemo maxime voluptas, optio mollitia, natus
        laborum nesciunt distinctio nisi cum explicabo libero culpa iusto beatae
        odit magni, consequuntur accusantium aliquam. Assumenda veritatis nam
        eveniet dolorum sequi facere placeat consectetur totam dignissimos. Iure
        alias dolorem sint, expedita non dignissimos deserunt voluptatum
        dolorum, mollitia laudantium maiores aut sapiente debitis tenetur? Esse
        veritatis sunt perspiciatis quae, explicabo incidunt officiis maxime non
        id ipsa possimus saepe quia numquam deserunt assumenda perferendis error
        delectus et. Molestiae mollitia, facilis eveniet error accusamus ipsam,
        neque praesentium ratione sed minima explicabo? Repellendus unde
        consequatur dolore, obcaecati similique consectetur incidunt libero
        sapiente omnis adipisci, natus laboriosam animi iste nulla. Recusandae
        aspernatur quos nihil non obcaecati, omnis quasi enim distinctio
        similique? Neque maiores reprehenderit similique modi consequuntur aut
        eum voluptatum ipsum nemo expedita, perferendis eaque? Asperiores
        aliquam beatae, molestiae unde cupiditate aspernatur quisquam vitae
        adipisci, sequi quasi totam ipsam accusamus eligendi cum! Debitis
        molestiae cumque eos, explicabo suscipit earum perferendis quam
        cupiditate commodi provident modi iste illo necessitatibus odit libero
        id accusamus unde? Cum voluptatibus expedita debitis dolor cumque
        repellat aliquid accusantium aut molestiae dolorem hic optio aspernatur
        harum ullam, saepe amet quae? Eveniet modi suscipit fugiat eos adipisci,
        illo voluptatum dolorum sequi ullam ea error temporibus perferendis
        optio a assumenda quos tempora alias. Minus eveniet officia doloremque?
        Debitis, tempore non nisi modi voluptates facere itaque? Eaque, deleniti
        voluptas blanditiis magni obcaecati minus? Nisi aliquam fugiat porro
        autem repellat ipsam maxime laudantium velit facilis ducimus nemo vitae
        perferendis, corporis adipisci repudiandae mollitia doloribus saepe
        officiis animi. Et, rerum labore maiores autem unde facilis possimus
        asperiores, qui animi magnam provident quibusdam nesciunt molestiae nemo
        vitae! Provident dolorum quam velit, iste incidunt itaque molestiae quod
        quibusdam et, eveniet dignissimos ut esse corporis hic placeat iure quis
        autem eius? Neque natus tempore aliquam libero eveniet aliquid
        reiciendis nostrum obcaecati rerum iste quidem vel dignissimos aperiam,
        possimus ut. Similique expedita ipsa fuga aut saepe recusandae in,
        voluptatibus vitae sit ea rerum architecto veniam exercitationem
        assumenda magni aliquam ab ducimus pariatur at quibusdam amet dolore ex
        deleniti. Voluptate placeat repellendus odit optio ea excepturi
        quibusdam, a voluptatibus quos illum dolores expedita accusantium
        assumenda beatae. Ratione voluptate, aperiam quae ipsam consectetur
        beatae illum sapiente! Fugiat vero ea enim itaque quae eum totam cum
        nesciunt facilis assumenda repellendus eos ipsa veritatis, harum
        accusantium possimus dolore illo consectetur officiis, asperiores eius
        at esse. Non reprehenderit iusto ex sed, eligendi, doloribus architecto
        laboriosam nam consectetur impedit autem excepturi nisi quibusdam
        repudiandae dicta nemo ab magni praesentium. Perspiciatis ipsam pariatur
        vel adipisci earum sint, itaque voluptates harum quaerat sed, expedita
        omnis natus doloribus explicabo voluptatem praesentium? Pariatur fuga
        cumque numquam omnis, obcaecati, corporis rerum repellat magni neque hic
        mollitia magnam doloribus eos dolorum ducimus autem dolore maiores quo
        cupiditate ipsam. Aut excepturi eius architecto quam non rem fuga
        corporis ut possimus. Fuga porro nihil dicta vel, veniam sit nam in ab
        officia modi adipisci harum, numquam accusantium sunt dolores
        consequatur consectetur dignissimos quia quas. Modi ex maiores
        temporibus odit facere, sit ipsum nulla tempora tenetur nemo, obcaecati,
        maxime inventore voluptates! Amet repudiandae id fugit doloribus cum
        magni labore tempora, saepe deleniti ratione provident! Optio unde
        accusamus in rerum veritatis itaque molestias doloremque dignissimos
        pariatur, sit dolores neque, expedita voluptatum asperiores vitae
        tempore sint enim non quasi amet architecto veniam. Exercitationem,
        porro ab quia modi officiis fugiat veniam doloremque quo rerum ipsa vel!
        Iste, consequatur. Qui, modi ipsa. Necessitatibus voluptatem sed minus,
        tempore rerum temporibus quam nesciunt totam modi expedita molestiae
        optio autem natus ipsum libero voluptatum et, maiores assumenda
        possimus! Doloribus molestias natus quia aliquid, ex perferendis tenetur
        facilis voluptatem a, labore quasi nam! Delectus sint perspiciatis
        asperiores architecto magnam, distinctio nostrum amet illum nam,
        repellendus suscipit! Iste, molestias veniam. Vel, voluptatem. Quo
        eveniet cupiditate cum dolorum! Fuga beatae assumenda iste et labore
        provident nobis illum rerum id, modi perspiciatis dolorem? Ab eius
        doloribus repudiandae voluptas voluptate mollitia nesciunt praesentium
        quas consectetur accusamus, esse nobis cupiditate, repellat obcaecati
        commodi, quaerat neque et? Corrupti, molestias quo esse incidunt enim
        adipisci ut earum dolorum vel quidem eligendi quisquam laboriosam
        inventore ex, tempore aliquam consequuntur dolore eius aut ipsa odit
        minus dolores? Quam in hic ipsam porro est. Doloremque, harum? Rem
        provident eligendi maxime facilis! Id explicabo pariatur et soluta quas
        assumenda neque sapiente. Architecto, sapiente voluptatibus. Debitis
        facilis perferendis quaerat magni accusantium molestias aut eius eos
        placeat obcaecati, commodi ab in minus recusandae atque dolor itaque,
        nesciunt quia reiciendis iure officiis aliquid? Quae maiores et aliquid
        architecto cumque, sed laudantium, rerum aliquam tempore, dolore quod!
        Itaque voluptatum exercitationem fuga voluptates dolore ut quos expedita
        eveniet deleniti, deserunt, pariatur culpa! Neque a libero culpa
        consectetur alias ut sequi velit qui id exercitationem consequuntur et
        omnis consequatur voluptate aspernatur ratione facilis esse pariatur,
        doloremque debitis hic praesentium vitae numquam! Expedita eos ratione
        veritatis veniam. Soluta repellendus qui nemo harum id facilis explicabo
        nihil maxime suscipit, officia libero sed! Cumque culpa voluptates
        magnam! Soluta quas ratione quidem id, ab perspiciatis dolores, nisi,
        quasi ipsa quam sit debitis! Labore temporibus aperiam saepe fugit a
        ipsum quaerat vel fugiat, libero eveniet. Aliquid labore, doloribus
        tempora distinctio voluptatem est qui architecto odio optio possimus
        quae accusantium accusamus itaque impedit aperiam ea provident repellat
        necessitatibus ullam quod. Suscipit incidunt aspernatur omnis rerum
        ratione, aperiam ea pariatur officiis tempora voluptate, deserunt
        accusantium doloremque quod! Maxime eveniet alias provident, suscipit
        eos assumenda animi voluptatum facilis amet quos? Nulla at repudiandae
        aperiam repellendus minima omnis, beatae aliquam maiores, eum cupiditate
        corrupti ipsa consequatur ipsum. Ab accusamus provident corrupti,
        facilis aspernatur maiores incidunt porro soluta ad animi! Aliquid minus
        nulla iste mollitia laudantium eius necessitatibus ullam accusantium,
        magnam assumenda quis voluptatem harum commodi veniam accusamus
        praesentium qui ratione nemo facere autem officiis quas culpa voluptatum
        incidunt? At in non nisi facilis quod consectetur ducimus nam minus
        expedita nesciunt totam consequuntur dignissimos iusto, facere
        cupiditate aut. Illum non voluptatum vitae repellendus. Consectetur est
        a vero corporis incidunt rerum pariatur. Fugiat et ipsum, distinctio
        facilis perferendis maiores delectus reiciendis repudiandae, cum id est
        corrupti. Quisquam nam repellendus at cumque impedit, enim praesentium
        deserunt nulla fugiat? Aliquid vitae quo beatae necessitatibus et,
        molestiae, expedita at est exercitationem modi repellendus. Nam natus
        dolor ipsa reprehenderit quos, dignissimos voluptatum labore ullam dicta
        sit quas facilis non iure commodi asperiores, minus fugit, blanditiis
        aliquid repellat eius praesentium consequuntur in aliquam qui! Quam
        reiciendis dolorem officiis, ex laborum repellendus vel alias nam iste
        possimus reprehenderit recusandae quod quas, temporibus qui! Unde, nemo
        aspernatur vero quo qui, iure aperiam, aut ad laboriosam est hic quis
        eius. Dolor nulla necessitatibus tenetur? Sunt, esse! Necessitatibus
      </div>
    </>
  );
};

export default Keyboard;
