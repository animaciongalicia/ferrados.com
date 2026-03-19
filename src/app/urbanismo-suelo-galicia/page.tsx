import type { Metadata } from "next";
import Link from "next/link";
import UrbanismoForm from "@/components/forms/UrbanismoForm";

export const metadata: Metadata = {
  title: "Urbanismo y tipos de suelo en Galicia — ¿Qué puedo hacer con mi finca?",
  description:
    "¿Puedes construir en tu finca rústica en Galicia? Tipos de suelo, casas prefabricadas, segregaciones, cambios de calificación y normativa urbanística gallega explicada sin jerga.",
};

export default function UrbanismoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Urbanismo y suelo</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Urbanismo en Galicia: qué puedes (y qué no puedes) hacer con tu finca
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Tienes una finca en Galicia y quieres construir, poner una casa prefabricada,
        segregar o simplemente saber qué tipo de suelo tienes. El problema es que la
        normativa urbanística gallega es un laberinto. Aquí te lo explicamos sin jerga
        técnica y te conectamos con quien puede ayudarte.
      </p>

      {/* Datos clave */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-emerald-900 mb-3">
          Lo que tienes que saber antes de hacer nada
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-700">6 tipos</p>
            <p className="text-sm text-gray-600 mt-1">De suelo rústico en la LOUGA</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-700">300 m²</p>
            <p className="text-sm text-gray-600 mt-1">Superficie máxima típica en rústico común</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-700">2.000+ m²</p>
            <p className="text-sm text-gray-600 mt-1">Parcela mínima habitual para construir</p>
          </div>
        </div>
      </section>

      {/* Tipos de suelo */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Los tipos de suelo en Galicia: por qué importa tanto
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          El tipo de suelo de tu finca determina absolutamente todo: si puedes construir,
          qué puedes construir, cuánto vale el terreno y qué usos le puedes dar. La
          clasificación la establece el plan urbanístico de cada ayuntamiento.
        </p>
        <div className="space-y-3">
          {[
            { tipo: "Urbano", desc: "Suelo dentro del casco urbano. Se puede construir con licencia municipal. El más caro y con menos restricciones." },
            { tipo: "Núcleo rural", desc: "Aldeas y núcleos tradicionales. Se puede construir vivienda unifamiliar cumpliendo requisitos específicos (parcela mínima, retranqueos, tipología). Hay dos subtipos: tradicional y común." },
            { tipo: "Urbanizable", desc: "Suelo previsto para desarrollo urbano futuro. No se puede construir hasta que se apruebe un plan parcial. Puede tardar años o no ejecutarse nunca." },
            { tipo: "Rústico común", desc: "El más habitual en Galicia. Permite vivienda vinculada a explotación agraria y, en algunos casos, vivienda unifamiliar aislada con autorización autonómica. Muy restrictivo." },
            { tipo: "Rústico de protección forestal", desc: "Montes y terrenos forestales. Muy limitado: solo se permiten construcciones vinculadas a la explotación forestal. No puedes poner una casa." },
            { tipo: "Rústico de protección agropecuaria", desc: "Tierras de labor y prados. Similar al forestal: las construcciones deben vincularse a la actividad agraria o ganadera." },
          ].map((item) => (
            <div key={item.tipo} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-lg">
              <span className="text-emerald-700 font-bold mt-0.5 shrink-0">{item.tipo}</span>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preguntas más frecuentes como secciones */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Puedo poner una casa prefabricada en suelo rústico?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Es la pregunta del millón. La respuesta corta: <strong>depende del tipo de
          rústico y del ayuntamiento</strong>. Una casa prefabricada fijada al suelo se
          considera edificación a todos los efectos — necesita licencia urbanística exactamente
          igual que una casa de obra.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          En suelo rústico común, con autorización autonómica y cumpliendo requisitos
          (parcela mínima de 2.000 m², retranqueos, altura máxima), puede ser posible.
          En rústico de protección forestal o agropecuaria, es prácticamente imposible
          si no vinculas la construcción a una explotación.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>Cuidado:</strong> Las &ldquo;tiny houses&rdquo; sobre ruedas y las casetas de
            madera sin cimentación se mueven en una zona gris legal. Que no necesiten
            cimentación no significa que no necesiten licencia. Consulta siempre con el
            ayuntamiento antes de comprar nada.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Segregar una finca rústica en Galicia
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Segregar es dividir una finca en dos o más parcelas independientes. En Galicia,
          la unidad mínima de cultivo varía por municipio (normalmente entre 1.500 y
          5.000 m² en rústico). No puedes segregar por debajo de esa superficie.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Para segregar necesitas: licencia municipal de segregación, escritura notarial,
          y luego inscribir las nuevas fincas en el Registro de la Propiedad y el
          Catastro. Un técnico (arquitecto o ingeniero) tendrá que hacer un informe de
          medición.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Los 5 errores más caros en urbanismo rural gallego
        </h2>
        <div className="space-y-3">
          {[
            { error: "Comprar un terreno rústico pensando que puedes construir", consecuencia: "El tipo de suelo lo decide el plan urbanístico municipal, no el vendedor. Verifica SIEMPRE la calificación antes de comprar." },
            { error: "Poner una casa prefabricada sin licencia", consecuencia: "La Xunta y los ayuntamientos están demoliendo construcciones ilegales en rústico. La multa puede superar los 30.000 € más la demolición a tu costa." },
            { error: "Confundir núcleo rural con rústico", consecuencia: "Son categorías distintas con normas muy diferentes. En núcleo rural puedes construir vivienda; en rústico común, solo con autorización autonómica y muchas restricciones." },
            { error: "No comprobar la unidad mínima de cultivo antes de segregar", consecuencia: "Si segregas por debajo del mínimo, la segregación es nula. Habrás pagado notario y registro para nada." },
            { error: "Fiarse de que el Catastro refleja la realidad urbanística", consecuencia: "El Catastro es fiscal, no urbanístico. Que tu finca figure como 'rústico' en el Catastro no dice nada sobre si puedes construir. Eso lo dice el plan urbanístico." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-lg">
              <span className="text-red-600 font-bold mt-0.5">{i + 1}.</span>
              <div>
                <p className="font-semibold text-gray-900">{item.error}</p>
                <p className="text-sm text-gray-600 mt-1">{item.consecuencia}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Quieres saber qué puedes hacer con tu finca?
        </h2>
        <p className="text-gray-600 mb-2">
          Cuéntanos tu situación y un técnico especializado en urbanismo rural
          en Galicia te contactará. Sin compromiso.
        </p>
      </section>

      <section id="formulario">
        <UrbanismoForm origen="pilar-urbanismo" />
      </section>
    </div>
  );
}
