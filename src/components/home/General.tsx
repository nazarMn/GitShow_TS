import React, { useState, useEffect } from 'react';
import TypeIt from 'typeit-react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGitlab, faGitkraken, faBitbucket } from "@fortawesome/free-brands-svg-icons";

// Важливо для доступності (accessibility) react-modal. 
// Зазвичай це викликається один раз у main.tsx, але можна і тут.
Modal.setAppElement('#root');

const General: React.FC = () => {
  const texts: string[] = ['Create A Portfolio', 'Share Projects', 'Get To Know Other Developers', 'View Projects'];

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openPolicyModal = () => setIsPolicyModalOpen(true);
  const closePolicyModal = () => setIsPolicyModalOpen(false);

  return (
    <div className="w-full h-[86vh] flex flex-col justify-center items-center px-6 md:px-[58px] bg-white dark:bg-[#101010] transition-colors duration-300">
      
      {/* Верхня частина */}
      <div className="w-full h-[15vh] flex justify-start items-end pb-4">
        <h2 className="text-[18px] font-medium tracking-[2px] text-[#15014b] dark:text-white pl-2.5 border-l-[3px] border-[#00684A]">
          GITHUB PORTFOLIO
        </h2>
      </div>

      {/* Середня частина з анімацією */}
      <div className="w-full h-[35vh] flex justify-start items-end pb-4">
        <h2 className="text-[#15014b] dark:text-white pl-2.5 text-[40px] md:text-[88px] font-medium leading-[1.2] md:leading-[108px] font-serif">
          Loved by developers. <br />
          You Can{' '}
          <span className="bg-[linear-gradient(91deg,#00aa57_0%,#00684a_100%)] bg-clip-text text-transparent">
            <TypeIt
              options={{
                strings: texts,
                loop: true,
                breakLines: false,
                speed: 100,
                deleteSpeed: 50,
              }}
            />
          </span>
        </h2>
      </div>

      {/* Нижня частина */}
      <div className="w-full h-[50vh] flex flex-col pt-[38px]">
        <div className="w-full flex justify-start items-start mb-8">
          <h2 className="text-[#15014b] dark:text-white pl-2.5 text-[16px] md:text-[24px] font-normal tracking-[2px] leading-[1.5] md:leading-[45px]">
            GitShow is a platform for creating portfolios and connecting with developers. Showcase your
            projects, <br className="hidden md:block" /> share your experience, and network in a user-friendly format.
          </h2>
        </div>
        
        <div className="w-full flex justify-center items-center mt-auto pb-10">
          <button 
            onClick={openLoginModal}
            className="w-[200px] h-[50px] bg-[#15014b] dark:bg-white text-white dark:text-[#101010] text-[20px] font-medium rounded-[18px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-[#8c6fa9] dark:hover:bg-[#8c6fa9] hover:-translate-y-[2px] active:bg-[#5c3f7d] dark:active:bg-[#5c3f7d] active:translate-y-0 px-5"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* МОДАЛЬНЕ ВІКНО: ЛОГІН */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        overlayClassName="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center"
        className="bg-white w-[90%] max-w-[650px] flex flex-col p-6 rounded-[10px] outline-none shadow-xl"
      >
        <header className="w-full flex justify-between items-start mb-6">
          <h2 className="text-[24px] md:text-[28px] font-bold tracking-[2px] text-[#15014b]">
            Join GitShow
          </h2>
          <button onClick={closeLoginModal} className="bg-transparent border-none cursor-pointer text-[#101010] hover:text-[#15014b] hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </header>

        <div className="w-full flex flex-col">
          <h2 className="text-[16px] md:text-[18px] font-normal tracking-[2px] text-[#15014b] mb-4">
            Choose how you'd like to create your account:
          </h2>

          <ul className="flex flex-col gap-4 w-full list-none p-0 m-0">
            <a href="/auth/github" className="w-full h-[60px] bg-[#181717] text-white text-[16px] md:text-[18px] font-medium tracking-[2px] flex items-center px-5 gap-4 rounded-[12px] hover:bg-black transition-colors cursor-pointer no-underline">
              <li>
                <FontAwesomeIcon icon={faGithub} size="2xl" />
                <span>Continue with GitHub</span>
              </li>
            </a>

            <li className="w-full h-[60px] bg-[#FC6D26] text-white text-[16px] md:text-[18px] font-medium tracking-[2px] flex justify-between items-center px-5 rounded-[12px] cursor-not-allowed">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faGitlab} size="2xl" />
                <span>Continue with GitLab</span>
              </div>
              <span className="text-[14px] md:text-[16px] opacity-70">Coming Soon</span>
            </li>

            <li className="w-full h-[60px] bg-[#179287] text-white text-[16px] md:text-[18px] font-medium tracking-[2px] flex justify-between items-center px-5 rounded-[12px] cursor-not-allowed">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faGitkraken} size="2xl" />
                <span>Continue with GitKraken</span>
              </div>
              <span className="text-[14px] md:text-[16px] opacity-70">Coming Soon</span>
            </li>

            <li className="w-full h-[60px] bg-[#0052CC] text-white text-[16px] md:text-[18px] font-medium tracking-[2px] flex justify-between items-center px-5 rounded-[12px] cursor-not-allowed">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faBitbucket} size="2xl" />
                <span>Continue with Bitbucket</span>
              </div>
              <span className="text-[14px] md:text-[16px] opacity-70">Coming Soon</span>
            </li>
          </ul>
        </div>

        <div className="w-full flex justify-center items-center text-center text-[14px] font-medium text-[#555] mt-8">
          <p className="m-0">
            By joining, you agree to GitShow's{' '}
            <span onClick={openPolicyModal} className="text-[#007bff] cursor-pointer underline transition-colors hover:text-[#0056b3]">Terms of Service</span>{' '}
            and{' '}
            <span onClick={openPolicyModal} className="text-[#007bff] cursor-pointer underline transition-colors hover:text-[#0056b3]">Privacy Policy</span>
          </p>
        </div>
      </Modal>

      {/* МОДАЛЬНЕ ВІКНО: ПОЛІТИКА (ЖАРТІВЛИВА) */}
      <Modal
        isOpen={isPolicyModalOpen}
        onRequestClose={closePolicyModal}
        overlayClassName="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center"
        className="bg-white w-[90%] max-w-[750px] max-h-[80vh] overflow-y-auto flex flex-col p-6 md:p-8 rounded-[10px] outline-none shadow-xl relative"
      >
        <button onClick={closePolicyModal} className="absolute top-4 right-5 bg-transparent border-none text-[24px] cursor-pointer text-[#101010] hover:text-[#15014b] hover:scale-110 transition-transform">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        
        <ul className="flex flex-col gap-6 list-none p-0 m-0 text-[#222]">
          <li className="flex flex-col gap-3">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-center text-[#111] mb-2">Політика конфіденційності</h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed">Останнє оновлення: 27.03.2025</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">Вітаємо на нашому сервісі! Використовуючи цей сайт, ви автоматично погоджуєтесь з усіма умовами цієї політики. А якщо не погоджуєтесь — все одно погоджуєтесь, бо ми так вирішили.</p>
          </li>

          <li className="flex flex-col gap-3">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-center text-[#111] mb-2">1. Збір та використання даних</h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed">Ми збираємо абсолютно все, що можна зібрати, включаючи, але не обмежуючись:</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">✔️ Ваші особисті дані (ім'я, прізвище, адресу, номер телефону, email, паролі... сподіваємось, не 123456).</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">✔️ Всі ваші повідомлення, думки, переписки, переглянуті сайти, список покупок та бажань.</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">✔️ Ваше місце знаходження (навіть якщо GPS вимкнено, ми все одно знайдемо вас).</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">✔️ Всі ваші пристрої, програми, файли, фото, відео, улюблені меми та глибокі дитячі страхи.</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">✔️ Вашу душу та фізичне тіло, які від моменту використання цього сайту переходять у нашу повну власність.</p>
          </li>

          <li className="flex flex-col gap-3">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-center text-[#111] mb-2">2. Як ми використовуємо ці дані?</h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed">💾 Для збереження, аналізу та продажу кому завгодно.</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">📢 Для показу реклами, яку ви не просили, але ми вирішили, що вона вам потрібна.</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">💸 Для монетизації, торгівлі, експериментів та, можливо, створення вашого цифрового клона.</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">😈 Для укладання темних угод, керування світом та можливого контролю над людством у майбутньому.</p>
          </li>

          <li className="flex flex-col gap-3">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-center text-[#111] mb-2">3. Чи несемо ми відповідальність за безпеку ваших даних?</h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed">Ні. Ніколи. Взагалі. Якщо щось трапиться з вашими даними, паролями, рахунком у банку чи приватним листуванням — то виключно ваша проблема.</p>
          </li>

          <li className="flex flex-col gap-3">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-center text-[#111] mb-2">4. Як можна видалити свої дані?</h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed">Ніяк. Ваші дані зберігатимуться вічно, навіть після вашої смерті. Вони будуть передані у спадок штучному інтелекту, який використовуватиме їх для невідомих експериментів.</p>
          </li>

          <li className="flex flex-col gap-3">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-center text-[#111] mb-2">5. Ваші права та свободи</h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed">🤣 Жарт. У вас їх більше немає.</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed">Використовуючи цей сайт, ви повністю передаєте нам свою особистість, права, душу, тіло та всі персональні дані.</p>
            <p className="text-[16px] md:text-[18px] leading-relaxed font-semibold mt-2">Дякуємо за співпрацю! 😈</p>
          </li>
        </ul>
      </Modal>

    </div>
  );
}

export default General;