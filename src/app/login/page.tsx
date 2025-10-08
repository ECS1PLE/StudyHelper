import UIButton from "@/components/Button/Button";
import Input from "@/components/Input/Input";

const login = () => {
    return(
        <div className="flex">
            <div className="flex relative w-[50vw] h-[100vh] justify-center">
                <div className="flex my-auto flex-col gap-[8px]">
                    <section className="flex flex-col gap-[12px]">
                        <Input label="Введите логин или почту"/>
                        <Input label="Введите пароль" type="password"/>
                    </section>
                    <section className="flex flex-col gap-[4px]">
                        <UIButton color="white">
                            Войти
                        </UIButton>
                        <UIButton color="transparent">
                            Регистрация
                        </UIButton>
                    </section>
                </div>
            </div>
            <div className="flex relative w-[50vw] h-[100vh] justify-center bg-white">
                <p className="flex my-auto text-5xl text-center text-black">XWorld</p>
            </div>
        </div>
    )
}

export default login;