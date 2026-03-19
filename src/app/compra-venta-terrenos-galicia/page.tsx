import type { Metadata } from "next";
import Link from "next/link";
import CompraVentaForm from "@/components/forms/CompraVentaForm";
import PilarJsonLd from "@/components/PilarJsonLd";

export const metadata: Metadata = {
  title: "Compra-venta de terrenos y fincas en Galicia — Guía completa",
  description:
    "¿Quieres comprar o vender un terreno, finca o monte en Galicia? Precios orientativos, trámites, errores a evitar y asesoramiento inmobiliario especializado en fincas rústicas.",
  alternates: { canonical: "/compra-venta-terrenos-galicia" },
};

export default function CompraVentaPage() {
  return (
    <>
    <PilarJsonLd
      title="Compra-venta de terrenos y fincas en Galicia"
      description="Asesoramiento para comprar o vender terrenos, fincas y montes en Galicia."
      slug="compra-venta-terrenos-galicia"
      breadcrumbLabel="Compra-venta de terrenos"
    />
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Compra-venta de terrenos</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Comprar o vender un terreno en Galicia: lo que nadie te cuenta
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Galicia es la comunidad con más parcelas de España — y también la que tiene
        más terrenos sin papeles claros, sin acceso definido y sin un precio de
        mercado transparente. Si quieres vender una finca heredada, comprar un
        terreno para construir o simplemente saber cuánto vale lo que tienes,
        necesitas información real, no promesas.
      </p>

      {/* Datos duros */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-blue-900 mb-3">
          El mercado de fincas rústicas en Galicia: la realidad
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-2xl font-bold text-blue-700">+11 millones</p>
            <p className="text-sm text-gray-600 mt-1">Parcelas catastrales en Galicia</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-2xl font-bold text-blue-700">0,5 – 3 €/m²</p>
            <p className="text-sm text-gray-600 mt-1">Precio habitual de monte rústico</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-2xl font-bold text-blue-700">70%</p>
            <p className="text-sm text-gray-600 mt-1">Fincas sin inscripción registral actualizada</p>
          </div>
        </div>
      </section>

      {/* Dolores del vendedor */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Quieres vender? Los problemas que te vas a encontrar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            { title: "No sabes cuánto vale tu terreno", desc: "No hay un Idealista para fincas rústicas. Los precios varían enormemente según la zona, el acceso, el tipo de suelo y si tiene madera. Sin una tasación real, puedes malvender o pedir un precio que espante a cualquier comprador." },
            { title: "Los papeles no están en regla", desc: "La finca está a nombre de un abuelo fallecido, no hay escrituras, el Catastro no coincide con la realidad... Hasta que esto no se arregle, no puedes vender legalmente." },
            { title: "No encuentras comprador", desc: "Las fincas rústicas en Galicia no se venden en portales convencionales. Necesitas acceso a compradores especializados: maderistas, inversores forestales, promotores rurales." },
            { title: "Te ofrecen precios ridículos", desc: "Los intermediarios saben que muchos propietarios están desesperados o desinformados. Sin conocer el valor real de tu finca (madera incluida), es fácil que te engañen." },
          ].map((item) => (
            <div key={item.title} className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dolores del comprador */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Quieres comprar? Los riesgos que debes conocer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            { title: "Comprar una finca sin acceso real", desc: "Muchas parcelas en Galicia no tienen acceso por carretera ni servidumbre de paso. Si compras sin verificar, puedes quedarte con un terreno al que no puedes llegar con maquinaria." },
            { title: "Lindes y superficie incorrectos", desc: "El Catastro en Galicia tiene errores masivos. Lo que te venden como 5.000 m² puede ser en realidad 3.000. Siempre hay que medir antes de comprar." },
            { title: "Cargas ocultas o proindivisos", desc: "Fincas con hipotecas, embargos, derechos de terceros o copropietarios que no saben que venden su parte. Una nota simple del Registro es imprescindible." },
            { title: "Clasificación urbanística sorpresa", desc: "No todo terreno rústico permite construir. Las normas urbanísticas gallegas son complejas y cambian según el municipio. Verifica la calificación antes de comprar." },
          ].map((item) => (
            <div key={item.title} className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Precios orientativos */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Cuánto vale un terreno en Galicia? Precios orientativos
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          El precio de una finca rústica en Galicia depende de muchos factores:
          ubicación, acceso, tipo de suelo, si tiene madera aprovechable, clasificación
          urbanística y estado documental. Estos son rangos orientativos:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Tipo de terreno</th>
                <th className="text-left p-3 font-semibold text-gray-700">Precio por m²</th>
                <th className="text-left p-3 font-semibold text-gray-700">1 hectárea</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">Monte con matorral (sin madera)</td><td className="p-3">0,20 – 0,80 €</td><td className="p-3">2.000 – 8.000 €</td></tr>
              <tr><td className="p-3">Monte con eucalipto/pino joven</td><td className="p-3">0,50 – 1,50 €</td><td className="p-3">5.000 – 15.000 €</td></tr>
              <tr><td className="p-3">Monte con madera madura</td><td className="p-3">1 – 3 €</td><td className="p-3">10.000 – 30.000 €</td></tr>
              <tr><td className="p-3">Terreno agrícola / prado</td><td className="p-3">1 – 5 €</td><td className="p-3">10.000 – 50.000 €</td></tr>
              <tr><td className="p-3">Parcela con ruina o edificación</td><td className="p-3">3 – 15 €</td><td className="p-3">Variable</td></tr>
              <tr><td className="p-3">Solar urbanizable</td><td className="p-3">15 – 80 €</td><td className="p-3">Variable</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          La madera en pie puede suponer más valor que el propio terreno. Un monte
          con eucalipto maduro de 1 hectárea puede tener 8.000 – 15.000 € solo
          en madera. Valora siempre el vuelo (la madera) además del suelo.
        </p>
      </section>

      {/* Paso a paso para vender */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Cómo vender un terreno en Galicia: paso a paso
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Verificar la titularidad", desc: "Comprueba que la finca está a tu nombre en el Registro de la Propiedad y en el Catastro. Si está a nombre de un fallecido, primero hay que tramitar la herencia." },
            { step: "2", title: "Obtener la nota simple y la referencia catastral", desc: "La nota simple del Registro (9 €) te dice quién es el titular, si hay cargas y la descripción de la finca. La referencia catastral permite localizar la parcela y ver su superficie oficial." },
            { step: "3", title: "Valorar la finca correctamente", desc: "Incluye el valor del suelo, la madera en pie (si la hay), la clasificación urbanística y el estado del acceso. Un tasador o un profesional inmobiliario rural puede darte un precio realista." },
            { step: "4", title: "Preparar la documentación", desc: "Escritura de propiedad, certificado de eficiencia energética (si hay edificación), cédula urbanística del ayuntamiento y certificado de estar al corriente del IBI." },
            { step: "5", title: "Encontrar comprador y firmar ante notario", desc: "La compraventa se formaliza en escritura pública. El comprador paga el Impuesto de Transmisiones Patrimoniales (habitualmente el 8% en Galicia para rústicos) y los gastos de notaría y registro." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
              <div>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Errores al comprar o vender */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Los 6 errores más caros al comprar o vender terrenos en Galicia
        </h2>
        <div className="space-y-3">
          {[
            { error: "Vender sin saber cuánto vale la madera", consecuencia: "Es el error más caro. Un monte con eucalipto maduro puede tener 10.000 – 20.000 € en madera. Si vendes el terreno sin valorar el vuelo, regalas ese dinero." },
            { error: "Comprar sin comprobar el Registro de la Propiedad", consecuencia: "Puedes comprar una finca con cargas, hipotecas o un proindiviso que te hará imposible disponer de ella." },
            { error: "Fiarse de la superficie del Catastro", consecuencia: "El Catastro en Galicia tiene errores de hasta el 50% en la superficie. Siempre hay que medir con un topógrafo antes de cerrar el precio." },
            { error: "No comprobar el acceso real", consecuencia: "Una finca sin acceso rodado puede perder el 80% de su valor. Verifica que existe camino y que tienes derecho legal a usarlo (servidumbre de paso)." },
            { error: "Ignorar la clasificación urbanística", consecuencia: "Comprar un terreno rústico pensando que puedes construir puede ser un error de miles de euros. Consulta siempre el plan urbanístico municipal." },
            { error: "No liquidar los impuestos a tiempo", consecuencia: "El vendedor debe estar al corriente del IBI. El comprador tiene 30 días hábiles para pagar el Impuesto de Transmisiones. Los recargos por demora se acumulan rápido." },
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

      {/* Sección para quien vive fuera */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Vivo fuera de Galicia, ¿puedo vender o comprar a distancia?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Sí. Miles de gallegos en la emigración tienen fincas heredadas que quieren
          vender sin tener que desplazarse. Un profesional inmobiliario local puede
          encargarse de todo: valoración, gestión documental, búsqueda de comprador
          y coordinación con el notario. Tú solo necesitas firmar un poder notarial
          (o acudir el día de la firma por videoconferencia, si el notario lo permite).
        </p>
        <p className="text-gray-700 leading-relaxed">
          Si quieres comprar desde fuera, un agente inmobiliario de confianza puede
          visitar las fincas, verificar el estado real, comprobar la documentación
          y negociar por ti. Es una inversión que puede ahorrarte muchos problemas.
        </p>
      </section>

      {/* Impuestos y costes */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Costes e impuestos de una compraventa de terrenos
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Concepto</th>
                <th className="text-left p-3 font-semibold text-gray-700">Quién paga</th>
                <th className="text-left p-3 font-semibold text-gray-700">Coste orientativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">Notaría (escritura de compraventa)</td><td className="p-3">Comprador</td><td className="p-3">300 – 1.000 €</td></tr>
              <tr><td className="p-3">Registro de la Propiedad</td><td className="p-3">Comprador</td><td className="p-3">100 – 400 €</td></tr>
              <tr><td className="p-3">Impuesto de Transmisiones Patrimoniales</td><td className="p-3">Comprador</td><td className="p-3">8% del precio escriturado</td></tr>
              <tr><td className="p-3">Plusvalía municipal</td><td className="p-3">Vendedor</td><td className="p-3">Variable (según municipio)</td></tr>
              <tr><td className="p-3">IRPF (ganancia patrimonial)</td><td className="p-3">Vendedor</td><td className="p-3">19-26% sobre la ganancia</td></tr>
              <tr><td className="p-3">Certificado energético (si hay edificación)</td><td className="p-3">Vendedor</td><td className="p-3">100 – 300 €</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Consigue una valoración profesional de tu terreno
        </h2>
        <p className="text-gray-600 mb-2">
          Cuéntanos tu situación y un profesional inmobiliario especializado
          en fincas rústicas en Galicia te contactará. Sin compromiso.
        </p>
      </section>

      <section id="formulario">
        <CompraVentaForm origen="pilar-compraventa" />
      </section>
    </div>
    </>
  );
}
