import Row from "./Row";

const Help = () => {
  return (
    <div>
      <h1>Kuidas mängida?</h1>
      <p>Arva ära õige 5-täheline eestikeelne sõna. Selleks on sul 6 katset.</p>
      <p>
        Peale sõna sisestamist värvuvad selle tähed vastavalt sellele, kui
        lähedal pakutu otsitavale sõnale on.
      </p>
      <p>Näiteks...</p>
      <Row word="kratt" evaluation={["correct", "tbd", "tbd", "tbd", "tbd"]} />
      <p>Täht &quot;K&quot; on otsitavas sõnas olemas ja õige koha peal.</p>
      <Row word="leitu" evaluation={["tbd", "present", "tbd", "tbd", "tbd"]} />
      <p>
        Täht &quot;E&quot; on otsitavas sõnas olemas, aga on hetkel vale koha
        peal.
      </p>
      <Row word="kahju" evaluation={["tbd", "tbd", "absent", "tbd", "tbd"]} />
      <p>Täht &quot;H&quot; puudub otsitavas sõnas.</p>
    </div>
  );
};

export default Help;
