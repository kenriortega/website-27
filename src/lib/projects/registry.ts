import type { Project } from "./types";

const projects = [
  {
    slug: "issues-tracker-pipeline",
    title: "Issues Tracker Pipeline",
    summary:
      "Pipeline de datos para recopilar y analizar issues de proyectos open source.",
    overview:
      "El proyecto extrae issues desde GitHub y Jira, orquesta su procesamiento con Apache Airflow, los publica en Apache Kafka, los almacena en ClickHouse y permite explorar sus métricas mediante Apache Superset.",
    challenge:
      "Los equipos y proyectos open source pueden distribuir el seguimiento de incidencias entre plataformas como GitHub y Jira. El reto consistía en recopilar esa información, normalizarla y ofrecer una vista centralizada que permitiera analizar el estado y la evolución de los issues.",
    solution:
      "Diseñé un pipeline de datos que extrae los issues desde sus plataformas de origen, orquesta el procesamiento con Apache Airflow sobre Kubernetes y distribuye los eventos mediante Apache Kafka. Los datos procesados se almacenan en ClickHouse y se presentan en dashboards de Apache Superset para facilitar su exploración.",
    contribution:
      "Participé en el diseño e implementación de la arquitectura, la integración entre sus componentes y la creación de un entorno reproducible con contenedores. También preparé y realicé una presentación pública para explicar las decisiones técnicas y demostrar el funcionamiento de la solución.",
    learnings: [
      "Diseño de pipelines de datos orientados a eventos.",
      "Orquestación de procesos con Apache Airflow y Kubernetes.",
      "Integración de Apache Kafka con ClickHouse.",
      "Modelado y visualización de información con Apache Superset.",
      "Comunicación de decisiones técnicas mediante una exposición pública.",
    ],
    year: 2022,
    status: "case-study",
    featured: true,
    technologies: [
      "Python",
      "Apache Airflow",
      "Apache Kafka",
      "ClickHouse",
      "Apache Superset",
      "Docker",
      "Kubernetes",
    ],
    repositoryUrl:
      "https://github.com/kenriortega/issues_tracker_pipeline",
    relatedArticleSlugs: ["kafka-serie-part-2"],
    highlights: [
      "Extracción de issues desde GitHub y Jira.",
      "Procesamiento orquestado con Apache Airflow sobre Kubernetes.",
      "Ingesta de eventos mediante Apache Kafka.",
      "Persistencia analítica en ClickHouse.",
      "Visualización de métricas con Apache Superset.",
    ],
    videos: [
      {
        title: "Presentación de Issues Tracker OSS",
        channel: "Canal invitado",
        url: "https://www.youtube.com/watch?v=XyvTmuAJ4b4",
      },
    ],
    images: [
      {
        src: "/projects/issues-tracker-pipeline/architecture.jpg",
        alt: "Arquitectura de Issues Tracker Pipeline desde Jira y GitHub hasta Apache Superset",
        width: 1280,
        height: 496,
        caption:
          "Flujo de datos entre Airflow, Kafka, ClickHouse y Superset.",
      },
      {
        src: "/projects/issues-tracker-pipeline/dashboard.jpg",
        alt: "Dashboard de Apache Superset con métricas de issues de proyectos open source",
        width: 1699,
        height: 1280,
        caption:
          "Dashboard resultante con métricas por proyecto, estado y tipo de issue.",
      },
    ],
  },
  {
    slug: "ngonx",
    title: "nGOnx",
    summary:
      "Proxy configurable en Go con soporte para HTTP, gRPC, balanceo de carga y servidores de archivos estáticos.",
    overview:
      "nGOnx es una plataforma de proxy creada como proyecto de investigación y aprendizaje de Go. Reúne reverse proxy HTTP, proxy transparente para gRPC, balanceo round-robin y servicio de archivos estáticos desde una CLI configurable, con capacidades de seguridad y observabilidad.",
    year: 2021,
    status: "case-study",
    featured: true,
    technologies: [
      "Go",
      "gRPC",
      "Prometheus",
      "OpenTelemetry",
      "BadgerDB",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
    repositoryUrl: "https://github.com/kenriortega/ngonx",
    highlights: [
      "Reverse proxy HTTP configurable mediante YAML.",
      "Proxy transparente para servicios gRPC.",
      "Balanceo round-robin entre múltiples backends.",
      "Servidor de archivos estáticos con soporte TLS.",
      "Protección de rutas mediante API key o JWT.",
      "Métricas con Prometheus y trazas con OpenTelemetry.",
      "Persistencia de credenciales mediante BadgerDB o Redis.",
    ],
    videos: [],
    images: [
      {
        src: "/projects/ngonx/cover.png",
        alt: "Gateway central distribuyendo distintos flujos de red hacia múltiples servicios backend",
        width: 1896,
        height: 830,
        caption:
          "Representación conceptual de las capacidades de proxy, balanceo y observabilidad de nGOnx.",
      },
    ],
  },
  {
    slug: "fastify-msgpack",
    title: "Fastify MessagePack",
    summary:
      "Plugin para Fastify que incorpora serialización y deserialización transparente mediante MessagePack.",
    overview:
      "Fastify MessagePack fue mi primera colaboración open source. El plugin permite que aplicaciones Fastify negocien respuestas y procesen solicitudes en formato MessagePack, manteniendo la experiencia habitual de trabajo con objetos y JSON dentro de la aplicación.",
    year: 2021,
    status: "open-source",
    featured: true,
    technologies: [
      "JavaScript",
      "Node.js",
      "Fastify",
      "MessagePack",
      "npm",
      "GitHub Actions",
    ],
    repositoryUrl: "https://github.com/kenriortega/fastify-msgpack",
    highlights: [
      "Serialización de respuestas mediante negociación de contenido.",
      "Interpretación de solicitudes application/x-msgpack.",
      "Integración transparente con el ciclo de vida de Fastify.",
      "JSON como formato de respuesta predeterminado.",
      "Pruebas automatizadas y publicación mediante GitHub Actions.",
      "Aceptado dentro del ecosistema oficial de Fastify.",
      "Primera colaboración open source de KenriDev.",
    ],
    videos: [],
    images: [
      {
        src: "/projects/fastify-msgpack/cover.png",
        alt: "Estructuras de datos transformándose en paquetes binarios compactos mediante un codificador central",
        width: 1857,
        height: 847,
        caption:
          "Representación conceptual de la serialización MessagePack y su integración con Fastify.",
      },
    ],
  },
  {
    slug: "flb-filter-iis",
    title: "Fluent Bit Filter for IIS",
    summary:
      "Filtro de Fluent Bit escrito en Rust y compilado a WebAssembly para transformar logs W3C de IIS en eventos JSON estructurados.",
    overview:
      "Fluent Bit Filter for IIS procesa registros W3C personalizados generados por Internet Information Services. El proyecto implementa en Rust un parser que se compila a WebAssembly y se ejecuta como filtro dentro de Fluent Bit, preparando los eventos para su envío a sistemas de almacenamiento y observabilidad como ClickHouse y Grafana. La solución fue incorporada como ejemplo en la documentación oficial de Fluent Bit y desarrollada posteriormente en una publicación técnica para Chronosphere.",
    year: 2023,
    status: "open-source",
    featured: true,
    technologies: [
      "Rust",
      "WebAssembly",
      "Fluent Bit",
      "IIS",
      "W3C Logs",
      "ClickHouse",
      "Grafana",
      "Docker",
      "GitHub Actions",
    ],
    repositoryUrl: "https://github.com/kenriortega/flb_filter_iis",
    highlights: [
      "Conversión de logs W3C sin estructurar en registros JSON.",
      "Filtro compatible con la interfaz WebAssembly de Fluent Bit.",
      "Extracción de información HTTP, servidor, cliente, estado y rendimiento.",
      "Dos formatos de salida para diferentes pipelines de observabilidad.",
      "Entorno reproducible con Fluent Bit, ClickHouse y Grafana.",
      "Pruebas automatizadas del parser.",
      "Compilación y publicación del binario WebAssembly mediante GitHub Actions.",
      "Distribución con versiones etiquetadas y licencia Apache 2.0.",
      "Incluido como ejemplo de filtro WASM para IIS en la documentación oficial de Fluent Bit.",
      "Caso práctico publicado en Chronosphere con el pipeline completo de observabilidad.",
    ],
    videos: [],
    images: [
      {
        src: "/projects/flb-filter-iis/iis-observability-pipeline.png",
        alt: "Arquitectura de observabilidad que envía logs W3C de IIS a Fluent Bit con WebAssembly y Rust, y después a ClickHouse y Grafana",
        width: 768,
        height: 247,
        caption:
          "Pipeline de observabilidad: IIS envía logs W3C a Fluent Bit, el filtro WebAssembly escrito en Rust los transforma a JSON y ClickHouse los almacena para visualizarlos con Grafana.",
      },
    ],
    references: [
      {
        type: "documentation",
        title: "Wasm filter plugins",
        publisher: "Fluent Bit Official Manual",
        url: "https://docs.fluentbit.io/manual/fluent-bit-for-developers/wasm-filter-plugins",
        description:
          "Documentación oficial que presenta flb_filter_iis como ejemplo de filtro WebAssembly escrito en Rust para procesar logs W3C de IIS.",
      },
      {
        type: "publication",
        title: "Custom IIS logging with Fluent Bit and Wasm",
        publisher: "Chronosphere",
        url: "https://chronosphere.io/learn/iis-logging-fluent-bit-wasm/",
        description:
          "Artículo técnico escrito por KenriDev sobre la configuración de IIS, el filtro Rust/WASM, el almacenamiento en ClickHouse y la visualización con Grafana.",
        publishedAt: "2024-08-30",
      },
    ],
  },
] as const satisfies readonly Project[];

export function getAllProjects(): readonly Project[] {
  return projects;
}

export function getFeaturedProjects(limit = 3): readonly Project[] {
  return projects.filter((project) => project.featured).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
