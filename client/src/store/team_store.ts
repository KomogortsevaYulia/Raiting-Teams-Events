import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import type { Permission } from "@/types";
import axios from "axios";
import type UpdateTeam from "@/views/Modals/UpdateTeam";

export const useTeamStore = defineStore("teams", () => {
    const layout = ref(true)

    function CreateTeamsTest() {
        console.log('Это сработало!');
    }

    // Вывести все коллективвы с руководителсями
    async function fetchTeams(): Promise<any> {
        const res = await axios.get('/api/teams')

        // const res2 = await axios.get('/api/uploads/',{params:{path:"/public/media/87a39a3586e19c22106a10ad53d0434b101.pdf"}} )
        // console.log(res2)
        const data = res.data

        return data
    }

    // data will be returned as index 0 - is data, index 1 is count
    async function fetchTeamsOfDirection(direction: number = -1, type_team = "teams"): Promise<any> {
        const res = await axios.get('/api/teams/direction', { params: { id_parent: direction, type_team: type_team } })
        const data = res.data

        return data
    }


    async function fetchCreateTeams() {
        await axios.get('/api')
            .then((respose: any) => {
                // Умные действия
            })
    }
    async function fetchTeam(id: number): Promise<any> {
        const res = await axios.get('/api/teams/' + id + '/users')
        const data = res.data
        console.log(data)
        return data
    }


    async function createTeam(title: string, description: string,
        shortname: string, userId: number, cabinet: string, fileUstav: any, fileDocument: any,) {

        let responseMsg = "сохранено"

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('shortname', shortname);
        formData.append('userID', userId.toString());
        formData.append('cabinet', cabinet);

        formData.append('files', fileUstav, `ustav.${fileUstav.name.split(".").pop()}`);
        formData.append('files', fileDocument, `document.${fileDocument.name.split(".").pop()}`);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }


        //create team
        await axios.post("api/teams", formData, config)
            .catch((err) => {
                if (err.response) {
                    responseMsg = err.response.data.message[0]
                }
            })

        return responseMsg
    }


    // обновить коллектив
    async function updateTeam(uT: UpdateTeam) {

        let responseMsg = "сохранено"

        const formData = new FormData();
        formData.append('title', uT.title);
        formData.append('description', uT.description);
        formData.append('shortname', uT.shortname);
        formData.append('cabinet', uT.cabinet);
        // paths to files
        if (uT.charterPath.length > 0)
            formData.append('charterTeam', uT.charterPath);
        if (uT.documentPath.length > 0)
            formData.append('document', uT.documentPath);

        formData.append('oldLeaderId', uT.oldUserId.toString());
        formData.append('newLeaderId', uT.newUserId.toString());

        if (uT.fileUstav != null)
            formData.append('files', uT.fileUstav, `ustav.${uT.fileUstav.name.split(".").pop()}`);

        if (uT.fileDocument != null)
            formData.append('files', uT.fileDocument, `document.${uT.fileDocument.name.split(".").pop()}`);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        const team = await axios.put("api/teams/" + uT.id, formData, config)
            .catch((err) => {
                if (err.response) {
                    responseMsg = err.response.data.message[0]
                }
            })

        return { team, responseMsg }


    }

    //архивировать или нет колелктив
    async function archiveTeam(id: number, isArchive: boolean) {
        let responseMsg = isArchive ? "архивировано" : "разархивировано"
        let isOK = true

        await axios.put(`api/teams/${id}/archive`, {
            isArchive: isArchive
        })
            .catch((err) => {
                if (err.response) {
                    responseMsg = err.response.data.message[0]
                    isOK = false
                }
            })

        return { responseMsg, isOK }
    }

    //fetch teams by
    async function fetchTeamsSearch(title="", description = "",tags=""): Promise<any> {

        //find by all txt data in table
        const res = await axios.get('/api/teams',{params:{
            title:title,
            description:description,
            tags:tags
        }})

        return res.data
    }

    // Переключение Switch_toggle в стр. Коллективы и Мероприятия
    function setLayout(res: any) {
        this.layout = res;
    }

    const menu_items = [
        {
            id: 1, title: 'Набор', hidden: true, menu_types: [
                { id: 1, title: 'Набор открыт' },
                { id: 2, title: 'Набор закрыт' },
            ]
        },
        {
            id: 2, title: 'Вид деятельности', hidden: true, menu_types: [
                { id: 1, title: 'Научная деятельность' },
                { id: 2, title: 'Учебная деятельность' },
                { id: 3, title: 'Научная деятельность' },
                { id: 4, title: 'Спортивная деятельность' },
                { id: 5, title: 'Культурно-творческая деятельность' },
            ]
        },
    ]

    return {
        CreateTeamsTest,
        fetchCreateTeams,
        fetchTeams,
        createTeam,
        setLayout,
        fetchTeamsOfDirection,
        fetchTeam,
        updateTeam,
        archiveTeam,
        fetchTeamsSearch,

        layout,
        menu_items
    }
});
