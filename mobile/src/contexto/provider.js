import React, { createContext, useContext, useState } from "react";

export const Context = createContext();

export default function Provider({ children }) {

    const [adm, setAdm] = useState(false)
    const [urlApi, setUrlApi] = useState("")
    const [nomeUser, setNomeUser] = useState("")
    const [emailUser, setEmailUser] = useState("")
    const [numeroUser, setNumeroUser] = useState("")
    const [imagemUser, setImagemUser] = useState("")
    const [idUser, setIdUser] = useState("")
    const [idAdm, setIdAdm] = useState("")
    const [imagemAdm, setImagemAdm] = useState("")
    const [emailAdm, setEmailAdm] = useState('')
    const [numeroAdm, setNumeroAdm] = useState('')
    const [token, setToken] = useState('')

    const [nomePet, setNomePet] = useState('')
    const [idadePet, setIdadePet] = useState('')
    const [generoPet, setGeneroPet] = useState('')
    const [racaPet, setRacaPet] = useState('')
    const [cuidadoPet, setCuidadoPet] = useState([])
    const [temperamentoPet, setTemperamentoPet] = useState([])
    const [tipoPet, setTipoPet] = useState(null)
    const [image, setImage] = useState("")
    const [urlImage, setUrlImage] = useState("")

    return (
        <Context.Provider value={{ adm, setAdm, setUrlApi, urlApi, nomeUser, setNomeUser, emailUser, setEmailUser, setNumeroUser, numeroUser, setImagemUser, imagemUser, setIdUser, idUser, idAdm, setIdAdm, setImagemAdm, imagemAdm, setEmailAdm, emailAdm, setNumeroAdm, numeroAdm, setNomePet, nomePet, setIdadePet, idadePet, setGeneroPet, generoPet, setRacaPet, racaPet, setCuidadoPet, cuidadoPet, setTemperamentoPet, temperamentoPet, setTipoPet, tipoPet, setImage, image, setUrlImage, urlImage, setToken, token }}>
            {children}
        </Context.Provider>
    )
}