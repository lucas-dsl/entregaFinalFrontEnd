import { useState, useEffect, useRef } from "react";

const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });

  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const validateName = () => {
    if (name.trim().length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "O nome deve conter pelo menos 2 caracteres",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: "" }));
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "O email deve ser um email válido",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validateMessage = () => {
    if (message.trim().length < 10) {
      setErrors((prev) => ({
        ...prev,
        message: "A mensagem deve conter pelo menos 10 caracteres",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, message: "" }));
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateName() && validateEmail() && validateMessage();

    if (isValid) {
      console.log("Form submitted", { name, email, message });

      setName("");
      setEmail("");
      setMessage("");
      setErrors({ name: "", email: "", message: "" });

      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);
    } else {
      console.log("Not submitted");
    }
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
    setErrors({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <main className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md my-15">
        <h1 className="text-2xl font-bold mb-6 text-center">Entre em Contato</h1>

        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
              required
              autoComplete="off"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Mensagem:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={validateMessage}
              required
              className="w-full border rounded-lg p-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Enviar
            </button>
            <button
              type="reset"
              className="flex-1 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Resetar
            </button>
          </div>
        </form>
      </main>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Sucesso!
            </h2>
            <p className="text-gray-700 mb-4">
              Formulário enviado com sucesso.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
