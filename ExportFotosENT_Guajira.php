<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Bogota");
$dir_fotos=$_SERVER['DOCUMENT_ROOT'].'/FOTOSENT_GUAJIRA/'; 

$DB_HOST='mysql.engenius.com.co'; 
$DB_USER='infovisitas'; 
$DB_PASSWORD='desarrollo2020';
$DB_DATABASE='Enterritorio';
$rta = array( "data1" => array(), "dat2" => array());

$link = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD);
if ($link -> connect_errno) {
die( "Fallo la conexión a MySQL: (" . $link -> mysqli_connect_errno() 
. ") " . $link -> mysqli_connect_error());
}
$link->set_charset("utf8");

$sql = "SELECT D.* FROM enterritoriobk.fotos_encuesta D WHERE Id_Encuesta IN ('258-1601213338383',
'258-1601215161700',
'258-1601216206850',
'258-1601217191980',
'258-1601217893607',
'258-1601219185556',
'258-1601225266675',
'258-1601226346650',
'258-1601227092400',
'258-1601227898643',
'258-1601228729404',
'258-1601229566070',
'258-1601231615317',
'258-1601232497421',
'258-1601233265723',
'258-1601237803109',
'258-1601247337213',
'258-1601302410479',
'258-1601304472839',
'258-1601378159357',
'258-1601379179512',
'258-1601380093098',
'258-1601383429169',
'258-1601385028036',
'258-1601398163216',
'258-1601411688244',
'258-1601412900967',
'259-1601212674371',
'259-1601214863846',
'259-1601220569801',
'259-1601222242037',
'259-1601232754375',
'259-1601239325980',
'259-1601242699665',
'259-1601244047669',
'259-1601303935167',
'259-1601308484922',
'259-1601312556500',
'259-1601326307659',
'259-1601329635421',
'260-1601216385239',
'260-1601219499052',
'260-1601234807633',
'260-1601236195002',
'260-1601297438190',
'260-1601298854717',
'260-1601304671050',
'260-1601306555385',
'260-1601317525406',
'260-1601377859721',
'260-1601379621619',
'260-1601382775680',
'260-1601383697283',
'260-1601384598008',
'260-1601385998386',
'260-1601393277643',
'260-1601394410678',
'260-1601395735135',
'260-1601405252896',
'260-1601409188836',
'260-1601409822546',
'260-1601411177088',
'260-1601412320523',
'260-1601413411072',
'260-1601574966497',
'260-1601577056822',
'260-1601578980062',
'260-1601579513407',
'260-1601580661726',
'260-1601588165134',
'260-1601589153098',
'260-1601590032431',
'260-1601646381625',
'260-1601658102130',
'260-1601658713672',
'260-1601659145273',
'260-1601659679668',
'260-1601660364757',
'260-1601660958285',
'261-1601214899727',
'261-1601480140140',
'261-1601482776862',
'261-1601487247025',
'261-1601489740206',
'261-1601495205183',
'261-1601496559616',
'262-1601209761338',
'262-1601211716050',
'262-1601213961973',
'262-1601215646342',
'262-1601217469282',
'262-1601218456329',
'262-1601220186407',
'262-1601221103274',
'262-1601230031241',
'262-1601231175457',
'262-1601232711642',
'262-1601235248734',
'262-1601236003210',
'262-1601236968483',
'262-1601300960914',
'262-1601303250460',
'262-1601310022464',
'262-1601311497090',
'262-1601463632437',
'262-1601574011768',
'262-1601575190145',
'262-1601576965524',
'262-1601578854953',
'262-1601579678285',
'262-1601580446981',
'262-1601640382896',
'262-1601641382902',
'262-1601646266857',
'262-1601647568081',
'262-1601651693010',
'262-1601658708639',
'262-1601659288785',
'262-1601659695218',
'262-1601660212944',
'262-1601660942687',
'262-1601667603585',
'263-1601216838261',
'263-1601237229163',
'263-1601297675717',
'263-1601298866182',
'263-1601304573264',
'263-1601310850884',
'263-1601317534786',
'263-1601318633818',
'263-1601376757926',
'263-1601378288559',
'263-1601379377995',
'263-1601381772628',
'263-1601383048009',
'263-1601384053517',
'263-1601385276009',
'263-1601385906162',
'263-1601389673148',
'263-1601405889840',
'263-1601409455644',
'263-1601410824349',
'263-1601485426001',
'263-1601486993334',
'263-1601488542742',
'263-1601489264743',
'263-1601574161427',
'263-1601578918423',
'263-1601580089045',
'263-1601582646890',
'263-1601584128082',
'263-1601585284212',
'263-1601586568536',
'263-1601590517394',
'263-1601651787710',
'263-1601658050156',
'263-1601659004968',
'263-1601659861000',
'263-1601660565524',
'263-1601661219874',
'264-1601987257553',
'264-1601997816595',
'264-1602000503771',
'264-1602008662015',
'264-1602014275732',
'264-1602018646964',
'264-1602020312114',
'264-1602022472106',
'264-1602070430554',
'264-1602076432851',
'264-1602078450634',
'264-1602081856830',
'264-1602084215848',
'264-1602085974894',
'264-1602087568996',
'264-1602089330009',
'264-1602091023581',
'264-1602095975962',
'264-1602101683822',
'264-1602104080210',
'264-1602165164562',
'264-1602169191048',
'264-1602172699073',
'264-1602180468483',
'264-1602259322339',
'264-1602261419866',
'264-1602268294706',
'264-1602270565367',
'264-1602273546827',
'264-1602276106899',
'264-1602428861383',
'264-1602437770879',
'264-1602444545067',
'264-1602450420408',
'264-1602858985292',
'274-1604406197154',
'274-1604408538422',
'274-1604411694820',
'274-1604414764926',
'274-1604419410526',
'274-1604420813472',
'274-1604424288866',
'274-1604432346135',
'274-1604493751087',
'274-1604495699878',
'274-1604496980999',
'274-1604499734927',
'274-1604500745624',
'274-1604503030596',
'274-1604503849649',
'274-1604504700286',
'274-1604522809428',
'274-1604586645862',
'274-1604587736735',
'274-1604590333779',
'274-1604591054564',
'274-1604596742536',
'274-1604663261368',
'274-1604666046397',
'274-1604765662862',
'274-1604766611487',
'274-1604767264443',
'274-1604768399989',
'274-1604770198588',
'274-1604771414915',
'274-1604840031494',
'274-1604843499859',
'274-1604846590012',
'274-1604847873632',
'274-1604849169468',
'274-1604850993153',
'274-1604854587905',
'274-1604855691698',
'274-1604856488145',
'274-1604863159211',
'274-1604868455297',
'274-1604869538431',
'274-1604872398090',
'274-1604873101860',
'274-1605098403038',
'274-1605099284724',
'274-1605100569453',
'274-1605101170987',
'274-1605101572348',
'274-1605102250242',
'274-1605112216112',
'274-1605112948813',
'274-1605113314527',
'274-1605113681224',
'274-1605114200177',
'274-1605115084537',
'274-1605115733351',
'274-1605116396986',
'274-1605184223342',
'274-1605184655503',
'274-1605185024906',
'274-1605185542261',
'274-1605185904392',
'274-1605186367622',
'274-1605186764601',
'274-1605187223856',
'274-1605187808647',
'274-1605188632692',
'277-1604523954831',
'277-1604585864605',
'277-1604590001641',
'277-1604591967623',
'277-1604593536997',
'277-1604595643748',
'277-1604597434177',
'277-1604669815893',
'277-1604672247565',
'277-1604685448968',
'277-1604687051964',
'277-1604688739801',
'277-1604690931407',
'277-1604763417332',
'277-1604765040494',
'277-1604766714606',
'277-1604769058175',
'277-1604772072124',
'277-1604773452692',
'277-1604775048664',
'277-1604776833829',
'277-1604838043772',
'277-1604839715589',
'277-1604841184051',
'277-1604922131039',
'277-1604923863700',
'277-1604925183019',
'277-1604928572729',
'277-1604930788751',
'277-1604932475292',
'277-1604933725587',
'277-1605013390809',
'277-1605015521938',
'277-1605018533003',
'277-1605020165970',
'277-1605031388580',
'277-1605209321082',
'277-1605276018826',
'277-1605279149912',
'277-1605287590780',
'277-1605526637918',
'277-1605528032465',
'277-1605562721664',
'277-1605610100012',
'277-1605615432198',
'277-1605618325432',
'277-1605625117688',
'277-1605627878875',
'277-1605629574667',
'277-1605631728133',
'279-1604497440607',
'279-1604501496576',
'279-1604503270823',
'279-1604504888525',
'279-1604506769107',
'279-1604507951713',
'279-1604516710196',
'279-1604521207342',
'279-1604522670407',
'279-1604524613098',
'279-1604526086183',
'279-1604527199654',
'279-1604595649633',
'279-1604609735497',
'279-1604611777543',
'279-1604659257922',
'279-1604660782271',
'279-1604662463593',
'279-1604664081274',
'279-1604678045447',
'279-1604696961350',
'279-1604951012292',
'279-1604952533189',
'279-1604953492867',
'279-1604954761401',
'279-1604955754414',
'279-1604957136243',
'279-1605034717324',
'279-1605036513788',
'279-1605037510887',
'279-1605044361910',
'279-1605045779166',
'279-1605096859404',
'279-1605102377712',
'279-1605108940265',
'279-1605113038266',
'279-1605181047429',
'279-1605186595270',
'279-1605197266116',
'279-1605198572552',
'279-1605200051029',
'279-1605212480531',
'279-1605213548536',
'279-1605282066496',
'279-1605282818656',
'280-1604419773439',
'280-1604422901771',
'280-1604426273629',
'280-1604428331916',
'280-1604490063991',
'280-1604492193611',
'280-1604495057896',
'280-1604498976028',
'280-1604500475649',
'280-1604509669450',
'280-1604511117263',
'280-1604512220318',
'280-1604519055537',
'280-1604521439736',
'280-1604522845195',
'280-1604576645413',
'280-1604580320689',
'280-1604584386930',
'280-1604586344945',
'280-1604588167039',
'280-1604589368573',
'280-1604603076022',
'280-1604605845671',
'280-1604608037560',
'280-1604754175276',
'280-1604755544463',
'280-1604767139534',
'280-1604770372071',
'280-1604781673113',
'280-1604783154320',
'280-1604785824451',
'280-1604786776250',
'280-1604834273646',
'280-1604843329699',
'280-1604854628603',
'280-1605219438711',
'280-1605538349740',
'280-1605541259201',
'280-1605547100307',
'280-1605551128410',
'280-1605553348665',
'280-1605555552304',
'280-1605559008578',
'280-1605609472646',
'280-1605616987657',
'280-1605622239923',
'280-1605624775739',
'280-1605629590326',
'280-1605631913880',
'280-1605787169296',
'280-1605792819548',
'280-1605798747486',
'280-1605801908575',
'280-1605803591549',
'280-1605804939370',
'280-1605806539427',
'280-1605820157000',
'280-1605873103793',
'280-1605876237172',
'280-1605879105029',
'280-1605880224781',
'280-1605956803232',
'280-1605992969799',
'280-1605995259249',
'280-1606041713049',
'280-1606043206465',
'280-1606044525609',
'280-1606045959388',
'280-1606046981138',
'280-1606047922684',
'280-1606049198657',
'280-1606050741431',
'280-1606052109894',
'280-1606053201054',
'280-1606066156703',
'280-1606070953478',
'280-1606130881303',
'280-1606153938465',
'280-1606157683517',
'280-1606161199795',
'280-1606163831903',
'280-1606167125627');";

//$sql = "SELECT A.*,D.* FROM enterritoriobk.fotos_firma A INNER JOIN enterritoriobk.encabezado N ON A.Id_Encuesta = N.Id_Encuesta INNER JOIN enterritoriobk.consentimiento D ON A.Id_Encuesta = D.Id_Encuesta INNER JOIN enterritoriobk.ubicacion J ON A.Id_Encuesta = J.Id_Encuesta WHERE N.IsDelete = '0' AND N.Mes > '8' AND D.Nombre_beneficiario_usuario != 'null' AND J.U_depto = 'Cesar';";

$result = $link->query($sql);
$result2= $result->fetch_all();
for ($i = 1; $i < count($result2); $i++) {
    /*if($result2[$i][26] == 0){
        $result2[$i][26] = $result2[$i][24].' '.$result2[$i][25];
    }*/
    $servidor = 'https://www.php.engenius.com.co/';
    
    mkdir(dirname($dir_fotos.$result2[$i][1].'/'.$result2[$i][0].'.jpg'), 0777, true);
    if(!@copy($servidor.$result2[$i][4],$dir_fotos.$result2[$i][1].'/'.$result2[$i][0].'.jpg')){
        /*mkdir(dirname($dir_fotos.$result2[$i][16].'/firma'.$result2[$i][1].'.jpg'), 0777, true);
        if(!@copy($servidor.$result2[$i][1].'.jpg',$dir_fotos.$result2[$i][16].'/firma'.$result2[$i][1].'.jpg')){*/
        $errors= error_get_last();
        echo "COPY ERROR: ".$errors['type'];
        echo "<br />\n".$errors['message'];
    } else {
        echo "File copied from remote!";
    }
    //echo ($servidor.$result2[$i][4]);
    //echo('BELEN DE TAPARAL/'.$result2[$i][20].'/'.$result2[$i][21].'/'.$result2[$i][26].'/'.$result2[$i][0].'.jpg');
}



/*
if(!@copy('http://www.mytagger.xyz/fotos/10000-201-1570763789409.jpg',$dir_fotos.'Imagen1.jpg'))
    {
        $errors= error_get_last();
        echo "COPY ERROR: ".$errors['type'];
        echo "<br />\n".$errors['message'];
    } else {
        echo "File copied from remote!";
    }
*/
?>