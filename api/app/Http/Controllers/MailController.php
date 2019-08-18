<?php

namespace App\Http\Controllers;

use App\Models\Fan;
use Illuminate\Http\Request;
use Mail;

class MailController extends Controller
{
    public function sendMailToFan()
    {
        try {
            $data = collect(request()->all());

            validate($data->toArray(), [
                "fan_id" => 'required',
                "subject" => 'required',
                "body" => 'required'
            ], [
                'fan_id.required' => 'Informe o torcedor para qual deseja enviar o e-mail.',
                'subject.subject' => 'Informe o assunto do e-mail.',
                'body.body' => 'Informe o corpo do e-mail.',
            ]);

            $fan = Fan::find($data->get('fan_id'));
            if (!$fan) {
                throw new Exception("Nenhum torcedor encontrado com essa informações.");
            }
            validate(['email' => $fan->email], [
                'email' => 'required|email:rfc,dns'
            ], [
                'email.required' => 'O email do torcedor não está cadastrado em nosso banco de dados.',
                'email.email' => 'O email do torcedor não é válido.'
            ]);

            $data = array(
                'name' => $fan->name, 'body' => $data->get('body'),
                'time' => new \DateTime(), 'subject' => $data->get('subject')
            );

            Mail::send('emails.mail', $data, function ($message) use ($fan, $data) {
                $message->to($fan->email, $fan->name)->subject("[Desafio AllBlacks] " . $data['subject']);
                $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            });

            return response()->json([
                'status' => 'success',
                'data' => "E-mail enviado com sucesso!"
            ]);
        } catch (\Exception $e) {
            //dd($e->getMessage(), $e->getTrace());
            return response([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function sendMail()
    {
        try {
            $params = collect(request()->all());

            validate($params->toArray(), [
                "subject" => 'required',
                "body" => 'required'
            ], [
                'subject.subject' => 'Informe o assunto do e-mail.',
                'body.body' => 'Informe o corpo do e-mail.',
            ]);

            $fans = Fan::query()->where('active', 1)->get();
            if (!$fans->count()) {
                throw new Exception("Nenhum torcedor encontrado.");
            }

            $errors = [];
            foreach ($fans as $fan) {
                $fail = validator(['email' => $fan->email], [
                    'email' => 'required|email:rfc,dns'
                ], [
                    'email.required' => 'O email do torcedor não está cadastrado em nosso banco de dados.',
                    'email.email' => 'O email do torcedor não é válido.'
                ]);

                if ($fail->messages()->first()) {
                    $errors[] =
                        "O torcedor: " . $fan->name . ", com o documento: " . $fan->document . ", apresentou os seguinte erro: " . $fail->messages()->first();
                    continue;
                }

                $data = array(
                    'name' => $fan->name, 'body' => $params->get('body'),
                    'time' => new \DateTime(), 'subject' => $params->get('subject')
                );
                try {
                    Mail::send('emails.mail', $data, function ($message) use ($fan, $data) {
                        $message->to($fan->email, $fan->name)->subject("[Desafio AllBlacks] " . $data['subject']);
                        $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
                    });
                } catch (\Exception $e) {
                    $errors[] =
                        "O torcedor: " . $fan->name . ", com o documento: " . $fan->document . ", 
                    apresentou os seguinte erro: " . $e->getMessage();
                    continue;
                }
            }

            if (count($errors) > 0) {
                return response()->json([
                    'status' => 'error',
                    'data' => ["errors" => $errors, "total" => $fans->count()]
                ]);
            }

            return response()->json([
                'status' => 'success',
                'data' => ["total" => $fans->count()]
            ]);
        } catch (\Exception $e) {
            return response([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
