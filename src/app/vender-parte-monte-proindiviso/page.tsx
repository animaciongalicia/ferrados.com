import type { Metadata } from "next";
import Link from "next/link";
import ProindivisoForm from "@/components/forms/ProindivisoForm";

export const metadata: Metadata = {
  title: "Proindivisos de montes en Galicia — Vender tu parte, disolver, agrupar",
  description:
    "¿Compartes un monte con primos, tíos o desconocidos? Proindivisos, minifundios, copropiedades en Galicia. Cómo vender tu parte o disolver el lío.",
};

export default function ProindivisoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Proindivisos y minifundios</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Proindivisos de montes en Galicia: cómo salir del bloqueo
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Un proindiviso es una propiedad que pertenece a varias personas a la vez
        sin estar dividida físicamente. En Galicia es una situación extremadamente
        habitual: herencias repartidas entre 4, 8 o 20 primos que no se hablan,
        montes a nombre de personas fallecidas hace décadas, parcelas tan pequeñas
        que no vale la pena dividir. El resultado es un bloqueo total: no se puede
        vender la madera, no se puede limpiar con garantías, no se puede hacer nada.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Por qué los proindivisos son tan problemáticos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Bloqueo económico", desc: "Para vender la madera o el terreno hace falta el consentimiento de todos los copropietarios. Si uno se niega, se bloquea todo." },
            { title: "Responsabilidad compartida", desc: "Si la Xunta exige limpiar, la multa puede recaer sobre cualquiera de los copropietarios, no necesariamente sobre todos." },
            { title: "Efecto multiplicador", desc: "Cada generación que pasa sin resolver el proindiviso multiplica los copropietarios. Un monte de 3 herederos se convierte en 15 en dos generaciones." },
            { title: "Dificultad de localización", desc: "A menudo ni siquiera se sabe quiénes son todos los copropietarios, dónde viven o si están vivos." },
          ].map((item) => (
            <div key={item.title} className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué opciones tienes?
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">1. Vender tu parte a otro copropietario</p>
            <p className="text-sm text-gray-600">Los demás copropietarios tienen derecho de tanteo y retracto. Si alguno quiere comprar, es la solución más rápida y económica.</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">2. Vender tu parte a un tercero (inversor o maderista)</p>
            <p className="text-sm text-gray-600">Un inversor forestal puede comprar tu cuota parte. El precio suele ser inferior al valor de mercado de la finca completa, pero te permite salir del proindiviso inmediatamente.</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">3. División material de la finca</p>
            <p className="text-sm text-gray-600">Si la finca es suficientemente grande, se puede dividir físicamente. Requiere un topógrafo y un acuerdo entre todos los copropietarios (o una sentencia judicial).</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">4. Disolución judicial del proindiviso</p>
            <p className="text-sm text-gray-600">Si no hay acuerdo, cualquier copropietario puede pedir al juez que disuelva el proindiviso. Se subasta la finca y se reparte el dinero. Es el último recurso, pero funciona.</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">5. Venta conjunta de la madera</p>
            <p className="text-sm text-gray-600">Si no queréis vender el terreno pero hay madera madura, se puede organizar una corta y repartir los beneficios proporcionalmente. Un maderista experimentado puede mediar.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Cuánto vale mi parte de un proindiviso?
        </h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          El valor de una cuota parte depende de:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Superficie total</strong> del monte o finca.</li>
          <li><strong>Tipo de terreno:</strong> un monte con eucalipto maduro vale mucho más que matorral.</li>
          <li><strong>Número de copropietarios:</strong> cuantos más son, más difícil la gestión y menor el valor de cada cuota.</li>
          <li><strong>Ubicación y acceso:</strong> un monte con carretera vale más que uno sin acceso.</li>
          <li><strong>Estado legal:</strong> si hay herencias sin hacer, el valor baja porque el comprador asume ese riesgo.</li>
        </ul>
        <p className="text-gray-700 mt-3 leading-relaxed">
          Regla general: una cuota parte de un proindiviso se vende con un
          descuento del 20-40% respecto al valor proporcional del terreno
          completo, porque el comprador asume la complejidad de gestionar
          el resto del proindiviso.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          El caso típico: &ldquo;Somos 8 primos y no nos ponemos de acuerdo&rdquo;
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Es el escenario más habitual en Galicia. Los abuelos tenían un monte,
          fallecieron, los padres no escrituraron, y ahora los nietos (que ni se
          conocen entre ellos) son copropietarios de algo que no saben dónde está,
          cuánto vale ni qué obligaciones tiene.
        </p>
        <p className="text-gray-700 leading-relaxed">
          La solución empieza siempre por el mismo sitio: <strong>identificar a
          todos los copropietarios</strong>, <strong>regularizar las herencias
          pendientes</strong> y <strong>valorar el terreno</strong>. A partir de
          ahí, se puede negociar. Un abogado o un inversor forestal con
          experiencia en proindivisos gallegos puede desbloquear situaciones
          que llevan años atascadas.
        </p>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Tienes un proindiviso que quieres resolver?
        </h2>
        <p className="text-gray-600 mb-2">
          Cuéntanos los detalles y un profesional con experiencia en proindivisos
          gallegos te contactará para orientarte.
        </p>
      </section>

      <section id="formulario">
        <ProindivisoForm origen="pilar-proindiviso" />
      </section>
    </div>
  );
}
